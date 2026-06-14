import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { backend, BACKEND_URL } from "@/lib/backend";
import { supabase } from "@/lib/supabase";
import { StatusBadge } from "@/components/app/StatCard";
import { Loader2, RefreshCw, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/health")({
  component: HealthPage,
});

type HealthData = Record<string, unknown>;

function tone(v: unknown): "ok" | "error" | "warn" | "idle" {
  if (v === true || v === "ok" || v === "loaded" || v === "online") return "ok";
  if (v === false || v === "error" || v === "down") return "error";
  if (v == null || v === "") return "idle";
  return "ok";
}

function HealthPage() {
  const health = useQuery({
    queryKey: ["health-full"],
    queryFn: () => backend.health() as Promise<HealthData>,
    retry: 0,
    refetchInterval: 15_000,
  });

  const db = useQuery({
    queryKey: ["db-ping"],
    queryFn: async () => {
      const { error } = await supabase.from("system_settings").select("id").limit(1);
      if (error) throw error;
      return true;
    },
    retry: 0,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4">
        <div>
          <h2 className="text-sm font-semibold">System status</h2>
          <p className="text-xs text-muted-foreground font-mono">{BACKEND_URL}</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => health.refetch()}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Row label="Backend">
          {health.isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : health.isError ? (
            <StatusBadge status="error" label="Offline" />
          ) : (
            <StatusBadge status="ok" label="Online" />
          )}
        </Row>
        <Row label="Database (Supabase)">
          {db.isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : db.isError ? (
            <StatusBadge status="error" label="Disconnected" />
          ) : (
            <StatusBadge status="ok" label="Connected" />
          )}
        </Row>

        {health.data && Object.entries(health.data).map(([k, v]) => {
          if (typeof v === "object") return null;
          return (
            <Row key={k} label={prettify(k)}>
              <StatusBadge status={tone(v)} label={String(v)} />
            </Row>
          );
        })}
      </div>

      {health.isError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-destructive">
            <ServerCrash className="h-4 w-4" /> Backend unreachable
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {(health.error as Error)?.message}
          </div>
        </div>
      )}

      {health.data && (
        <details className="rounded-xl border border-border/60 bg-card/60 p-4">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Raw response
          </summary>
          <pre className="mt-3 overflow-auto rounded bg-background/50 p-3 text-[11px] leading-relaxed">
{JSON.stringify(health.data, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

function prettify(k: string) {
  return k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/60 px-4 py-3">
      <div className="text-sm">{label}</div>
      <div>{children}</div>
    </div>
  );
}
