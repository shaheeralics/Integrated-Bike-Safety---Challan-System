import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  loading
}) {
  const tones = {
    default: "text-foreground",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    accent: "text-accent"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-7 w-7 place-items-center rounded-md bg-background/50", tones[tone]), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-3 font-mono text-2xl font-semibold tracking-tight", tones[tone]), children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-6 w-20 animate-pulse rounded bg-muted" }) : value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] });
}
function EmptyState({
  icon: Icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/30 px-6 py-14 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-full bg-muted/40 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm font-semibold", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 max-w-md text-xs text-muted-foreground", children: description }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: action })
  ] });
}
function StatusBadge({ status, label }) {
  const map = {
    ok: "bg-success/15 text-success border-success/30",
    warn: "bg-warning/15 text-warning border-warning/30",
    error: "bg-destructive/15 text-destructive border-destructive/30",
    idle: "bg-muted/30 text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        map[status]
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", {
          "bg-success": status === "ok",
          "bg-warning": status === "warn",
          "bg-destructive": status === "error",
          "bg-muted-foreground": status === "idle"
        }) }),
        label
      ]
    }
  );
}
export {
  EmptyState as E,
  StatusBadge as S,
  StatCard as a
};
