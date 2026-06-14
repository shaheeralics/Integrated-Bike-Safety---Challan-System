import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicNav, a as PublicFooter } from "./PublicNav-DWWV_KbR.mjs";
import { T as TriangleAlert, e as Target, f as CircleCheck, g as Cpu } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./button-BC9oXVxV.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-bold tracking-tight", children: "AI-driven traffic safety, built for real enforcement." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "The Integrated Bike Safety and Challan System (IBSCS) is a final year project that combines computer vision, OCR and a production challan workflow into a single deployable platform." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Problem", icon: TriangleAlert, tone: "text-warning", children: "Helmet non-compliance is a leading factor in motorcycle fatalities. Manual enforcement is inconsistent and cannot scale to the volume of riders observed by traffic cameras." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Objectives", icon: Target, tone: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Detect riders without helmets across multiple camera sources." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identify the offending vehicle via number-plate OCR." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Generate a challan automatically with full evidence trail." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide enforcement teams with analytics and repeat-offender intelligence." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Benefits", icon: CircleCheck, tone: "text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-5 list-disc space-y-1 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "24/7 automated monitoring without human bottlenecks." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Tamper-resistant evidence trail in cloud storage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Configurable thresholds and fine amounts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Scales horizontally — every camera is just another input source." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Technology stack", icon: Cpu, tone: "text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-card/60 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: s.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm font-medium", children: s.v })
      ] }, s.k)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
const stack = [{
  k: "Frontend",
  v: "React + TanStack Start + Tailwind + shadcn/ui"
}, {
  k: "Backend",
  v: "FastAPI on Hugging Face Spaces"
}, {
  k: "Detection",
  v: "YOLO (helmet + number plate)"
}, {
  k: "OCR",
  v: "EasyOCR (≥90% confidence)"
}, {
  k: "Database",
  v: "Supabase Postgres"
}, {
  k: "Storage",
  v: "Supabase Storage (evidence-images)"
}];
function Section({
  title,
  icon: Icon,
  tone,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 rounded-xl border border-border/60 bg-card/40 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${tone}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm", children })
  ] });
}
export {
  About as component
};
