import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { b as backend } from "./_ssr/backend-D2SZk2t7.mjs";
import { a as StatCard, E as EmptyState, S as StatusBadge } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import "./_libs/sonner.mjs";
import { j as FileExclamationPoint, k as Receipt, E as Car, l as Cctv, n as Activity, G as ArrowUpRight, i as ScanSearch } from "./_libs/lucide-react.mjs";
import { a as formatDistanceToNow } from "./_libs/date-fns.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/zod.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
function DashboardPage() {
  const violations = useQuery({
    queryKey: ["violations", "recent"],
    queryFn: async () => {
      const {
        data,
        error,
        count
      } = await supabase.from("violations").select("*", {
        count: "exact"
      }).order("timestamp", {
        ascending: false
      }).limit(8);
      if (error) throw error;
      return {
        rows: data || [],
        count: count ?? 0
      };
    }
  });
  const challans = useQuery({
    queryKey: ["challans", "recent"],
    queryFn: async () => {
      const {
        data,
        error,
        count
      } = await supabase.from("challans").select("*", {
        count: "exact"
      }).order("created_at", {
        ascending: false
      }).limit(8);
      if (error) throw error;
      return {
        rows: data || [],
        count: count ?? 0
      };
    }
  });
  const vehicles = useQuery({
    queryKey: ["vehicles", "count"],
    queryFn: async () => {
      const {
        count,
        error
      } = await supabase.from("vehicles").select("id", {
        count: "exact",
        head: true
      });
      if (error) throw error;
      return count ?? 0;
    }
  });
  const cameras = useQuery({
    queryKey: ["cameras", "active"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camera_sources").select("*");
      if (error) throw error;
      const rows = data || [];
      return {
        total: rows.length,
        active: rows.filter((c) => c.is_active).length
      };
    }
  });
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => backend.health(),
    retry: 0,
    refetchInterval: 3e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total violations", value: violations.data?.count ?? 0, loading: violations.isLoading, icon: FileExclamationPoint, tone: "destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total challans", value: challans.data?.count ?? 0, loading: challans.isLoading, icon: Receipt, tone: "primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Unique vehicles", value: vehicles.data ?? 0, loading: vehicles.isLoading, icon: Car, tone: "accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active cameras", value: `${cameras.data?.active ?? 0}/${cameras.data?.total ?? 0}`, loading: cameras.isLoading, icon: Cctv, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Backend", value: health.isLoading ? "…" : health.isError ? "Offline" : "Online", icon: Activity, tone: health.isError ? "destructive" : "success", hint: health.isError ? "Check System Health" : "Health OK" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border/60 bg-card/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border/60 px-5 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Recent violations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/violations", children: [
            "View all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60", children: [
          violations.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: Array.from({
            length: 4
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 animate-pulse rounded bg-muted/30" }, i)) }),
          !violations.isLoading && (violations.data?.rows || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: FileExclamationPoint, title: "No violations yet", description: "Once detections start coming in, they'll appear here." }),
          (violations.data?.rows || []).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-semibold", children: v.vehicle_number }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-[11px] text-muted-foreground", children: [
                v.camera_name || v.source_type || "unknown",
                " ·",
                " ",
                formatDistanceToNow(new Date(v.timestamp), {
                  addSuffix: true
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v.helmet_status ? "ok" : "error", label: v.helmet_status ? "Helmet" : "No helmet" })
          ] }, v.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border/60 bg-card/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between border-b border-border/60 px-5 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Recent challans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/challans", children: [
            "View all ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border/60", children: [
          challans.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-4", children: Array.from({
            length: 4
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 animate-pulse rounded bg-muted/30" }, i)) }),
          !challans.isLoading && (challans.data?.rows || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Receipt, title: "No challans yet" }),
          (challans.data?.rows || []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-semibold", children: c.challan_number }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-[11px] text-muted-foreground", children: [
                c.vehicle_number,
                " · PKR ",
                c.amount,
                " ·",
                " ",
                formatDistanceToNow(new Date(c.created_at), {
                  addSuffix: true
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: c.status === "Paid" ? "ok" : c.status === "Cancelled" ? "idle" : "warn", label: c.status })
          ] }, c.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Quick actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/detection", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "h-4 w-4" }),
          " Open Detection Center"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cameras", children: "Manage cameras" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", children: "Adjust settings" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/health", children: "System health" }) })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
