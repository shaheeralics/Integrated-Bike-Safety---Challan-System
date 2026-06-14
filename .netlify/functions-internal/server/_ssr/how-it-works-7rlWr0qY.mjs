import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicNav, a as PublicFooter } from "./PublicNav-DWWV_KbR.mjs";
import { C as Camera, a as ShieldAlert, R as Repeat, b as ScanLine, c as Search, F as FileText, D as Database, d as ChartColumn } from "../_libs/lucide-react.mjs";
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
const steps = [{
  icon: Camera,
  title: "Input source",
  desc: "Image, video, webcam, mobile camera or IP/RTSP stream."
}, {
  icon: ShieldAlert,
  title: "Helmet detection",
  desc: "YOLO classifies each rider as with-helmet or without-helmet."
}, {
  icon: Repeat,
  title: "Helmet missing?",
  desc: "If a violation is detected, the pipeline continues. Otherwise the frame is discarded."
}, {
  icon: ScanLine,
  title: "Plate detection",
  desc: "A second YOLO model crops the number plate region above the threshold."
}, {
  icon: Search,
  title: "OCR reading",
  desc: "EasyOCR extracts the plate number. Only readings ≥90% confidence are accepted."
}, {
  icon: Repeat,
  title: "Duplicate check",
  desc: "A 60-minute window prevents repeat challans for the same vehicle."
}, {
  icon: FileText,
  title: "Challan generation",
  desc: "Unique IBSCS-YYYY-###### challan number, PKR 500 default fine."
}, {
  icon: Database,
  title: "Evidence storage",
  desc: "Annotated image uploaded to Supabase Storage with VehicleNumber_Timestamp.jpg name."
}, {
  icon: ChartColumn,
  title: "Analytics update",
  desc: "Dashboard KPIs, trends and repeat-offender lists refresh in real time."
}];
function HowItWorks() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-accent", children: "Pipeline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-bold tracking-tight", children: "How IBSCS works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: "From any input source to a fully evidenced challan — each step runs server-side on the FastAPI backend and writes directly to the database." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-12 grid gap-4 md:grid-cols-2", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative flex gap-4 rounded-xl border border-border/60 bg-card/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            "Step ",
            String(i + 1).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-semibold", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: s.desc })
        ] })
      ] }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PublicFooter, {})
  ] });
}
export {
  HowItWorks as component
};
