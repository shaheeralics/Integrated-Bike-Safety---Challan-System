import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  loading,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: "default" | "primary" | "success" | "warning" | "destructive" | "accent";
  loading?: boolean;
}) {
  const tones: Record<string, string> = {
    default: "text-foreground",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    accent: "text-accent",
  };
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        {Icon && (
          <div className={cn("grid h-7 w-7 place-items-center rounded-md bg-background/50", tones[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className={cn("mt-3 font-mono text-2xl font-semibold tracking-tight", tones[tone])}>
        {loading ? <span className="inline-block h-6 w-20 animate-pulse rounded bg-muted" /> : value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/30 px-6 py-14 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-muted/40 text-muted-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-4 text-sm font-semibold">{title}</div>
      {description && <div className="mt-1 max-w-md text-xs text-muted-foreground">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function StatusBadge({ status, label }: { status: "ok" | "warn" | "error" | "idle"; label: string }) {
  const map = {
    ok: "bg-success/15 text-success border-success/30",
    warn: "bg-warning/15 text-warning border-warning/30",
    error: "bg-destructive/15 text-destructive border-destructive/30",
    idle: "bg-muted/30 text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        map[status],
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": status === "ok",
        "bg-warning": status === "warn",
        "bg-destructive": status === "error",
        "bg-muted-foreground": status === "idle",
      })} />
      {label}
    </span>
  );
}
