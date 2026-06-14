import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { B as BACKEND_URL, b as backend } from "./_ssr/backend-D2SZk2t7.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { S as StatusBadge } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import "./_libs/sonner.mjs";
import { v as RefreshCw, L as LoaderCircle, w as ServerCrash } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-router.mjs";
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
function tone(v) {
  if (v === true || v === "ok" || v === "loaded" || v === "online") return "ok";
  if (v === false || v === "error" || v === "down") return "error";
  if (v == null || v === "") return "idle";
  return "ok";
}
function HealthPage() {
  const health = useQuery({
    queryKey: ["health-full"],
    queryFn: () => backend.health(),
    retry: 0,
    refetchInterval: 15e3
  });
  const db = useQuery({
    queryKey: ["db-ping"],
    queryFn: async () => {
      const {
        error
      } = await supabase.from("system_settings").select("id").limit(1);
      if (error) throw error;
      return true;
    },
    retry: 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "System status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: BACKEND_URL })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => health.refetch(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        " Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Backend", children: health.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : health.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "error", label: "Offline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "ok", label: "Online" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Database (Supabase)", children: db.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : db.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "error", label: "Disconnected" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "ok", label: "Connected" }) }),
      health.data && Object.entries(health.data).map(([k, v]) => {
        if (typeof v === "object") return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: prettify(k), children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: tone(v), label: String(v) }) }, k);
      })
    ] }),
    health.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-semibold text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCrash, { className: "h-4 w-4" }),
        " Backend unreachable"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: health.error?.message })
    ] }),
    health.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "rounded-xl border border-border/60 bg-card/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Raw response" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-3 overflow-auto rounded bg-background/50 p-3 text-[11px] leading-relaxed", children: JSON.stringify(health.data, null, 2) })
    ] })
  ] });
}
function prettify(k) {
  return k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function Row({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/60 bg-card/60 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children })
  ] });
}
export {
  HealthPage as component
};
