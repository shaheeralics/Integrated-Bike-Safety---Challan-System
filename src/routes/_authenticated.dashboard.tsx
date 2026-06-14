import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { backend } from "@/lib/backend";
import type { Violation, Challan, CameraSource } from "@/lib/types";
import { StatCard, EmptyState, StatusBadge } from "@/components/app/StatCard";
import {
  FileWarning,
  Receipt,
  Car,
  Cctv,
  Activity,
  ScanSearch,
  ArrowUpRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const violations = useQuery({
    queryKey: ["violations", "recent"],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("violations")
        .select("*", { count: "exact" })
        .order("timestamp", { ascending: false })
        .limit(8);
      if (error) throw error;
      return { rows: (data || []) as Violation[], count: count ?? 0 };
    },
  });

  const challans = useQuery({
    queryKey: ["challans", "recent"],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from("challans")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return { rows: (data || []) as Challan[], count: count ?? 0 };
    },
  });

  const vehicles = useQuery({
    queryKey: ["vehicles", "count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("vehicles")
        .select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const cameras = useQuery({
    queryKey: ["cameras", "active"],
    queryFn: async () => {
      const { data, error } = await supabase.from("camera_sources").select("*");
      if (error) throw error;
      const rows = (data || []) as CameraSource[];
      return { total: rows.length, active: rows.filter((c) => c.is_active).length };
    },
  });

  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => backend.health(),
    retry: 0,
    refetchInterval: 30_000,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard
          label="Total violations"
          value={violations.data?.count ?? 0}
          loading={violations.isLoading}
          icon={FileWarning}
          tone="destructive"
        />
        <StatCard
          label="Total challans"
          value={challans.data?.count ?? 0}
          loading={challans.isLoading}
          icon={Receipt}
          tone="primary"
        />
        <StatCard
          label="Unique vehicles"
          value={vehicles.data ?? 0}
          loading={vehicles.isLoading}
          icon={Car}
          tone="accent"
        />
        <StatCard
          label="Active cameras"
          value={`${cameras.data?.active ?? 0}/${cameras.data?.total ?? 0}`}
          loading={cameras.isLoading}
          icon={Cctv}
          tone="success"
        />
        <StatCard
          label="Backend"
          value={
            health.isLoading ? "…" : health.isError ? "Offline" : "Online"
          }
          icon={Activity}
          tone={health.isError ? "destructive" : "success"}
          hint={health.isError ? "Check System Health" : "Health OK"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border/60 bg-card/60">
          <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
            <h2 className="text-sm font-semibold">Recent violations</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/violations">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </header>
          <div className="divide-y divide-border/60">
            {violations.isLoading && (
              <div className="space-y-2 p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-muted/30" />
                ))}
              </div>
            )}
            {!violations.isLoading && (violations.data?.rows || []).length === 0 && (
              <EmptyState
                icon={FileWarning}
                title="No violations yet"
                description="Once detections start coming in, they'll appear here."
              />
            )}
            {(violations.data?.rows || []).map((v) => (
              <div key={v.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="font-mono text-sm font-semibold">{v.vehicle_number}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {v.camera_name || v.source_type || "unknown"} ·{" "}
                    {formatDistanceToNow(new Date(v.timestamp), { addSuffix: true })}
                  </div>
                </div>
                <StatusBadge
                  status={v.helmet_status ? "ok" : "error"}
                  label={v.helmet_status ? "Helmet" : "No helmet"}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border/60 bg-card/60">
          <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
            <h2 className="text-sm font-semibold">Recent challans</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/challans">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </header>
          <div className="divide-y divide-border/60">
            {challans.isLoading && (
              <div className="space-y-2 p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-muted/30" />
                ))}
              </div>
            )}
            {!challans.isLoading && (challans.data?.rows || []).length === 0 && (
              <EmptyState icon={Receipt} title="No challans yet" />
            )}
            {(challans.data?.rows || []).map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="font-mono text-sm font-semibold">{c.challan_number}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {c.vehicle_number} · PKR {c.amount} ·{" "}
                    {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                  </div>
                </div>
                <StatusBadge
                  status={c.status === "Paid" ? "ok" : c.status === "Cancelled" ? "idle" : "warn"}
                  label={c.status}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border/60 bg-card/60 p-5">
        <h2 className="text-sm font-semibold">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/detection">
              <ScanSearch className="h-4 w-4" /> Open Detection Center
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cameras">Manage cameras</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/settings">Adjust settings</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/health">System health</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
