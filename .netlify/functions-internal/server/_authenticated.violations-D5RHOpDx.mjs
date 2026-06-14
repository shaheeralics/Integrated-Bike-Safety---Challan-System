import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./_ssr/select-CZRUt5a6.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./_ssr/table-RrXKMtST.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./_ssr/dialog-BV96Ob5P.mjs";
import { E as EmptyState, S as StatusBadge } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import "./_libs/sonner.mjs";
import { c as Search, j as FileExclamationPoint, I as Image } from "./_libs/lucide-react.mjs";
import { f as format } from "./_libs/date-fns.mjs";
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
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
function ViolationsPage() {
  const [q, setQ] = reactExports.useState("");
  const [source, setSource] = reactExports.useState("all");
  const [camera, setCamera] = reactExports.useState("all");
  const [helmet, setHelmet] = reactExports.useState("all");
  const [date, setDate] = reactExports.useState("");
  const [preview, setPreview] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["violations", {
      q,
      source,
      camera,
      helmet,
      date
    }],
    queryFn: async () => {
      let qb = supabase.from("violations").select("*").order("timestamp", {
        ascending: false
      }).limit(500);
      if (q) qb = qb.ilike("vehicle_number", `%${q}%`);
      if (source !== "all") qb = qb.eq("source_type", source);
      if (camera !== "all") qb = qb.eq("camera_name", camera);
      if (helmet !== "all") qb = qb.eq("helmet_status", helmet === "yes");
      if (date) {
        const start = (/* @__PURE__ */ new Date(date + "T00:00:00Z")).toISOString();
        const end = (/* @__PURE__ */ new Date(date + "T23:59:59Z")).toISOString();
        qb = qb.gte("timestamp", start).lte("timestamp", end);
      }
      const {
        data: data2,
        error
      } = await qb;
      if (error) throw error;
      return data2 || [];
    }
  });
  const sources = reactExports.useMemo(() => Array.from(new Set((data || []).map((v) => v.source_type).filter(Boolean))), [data]);
  const cameras = reactExports.useMemo(() => Array.from(new Set((data || []).map((v) => v.camera_name).filter(Boolean))), [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-card/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Vehicle number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search…", className: "pl-8 font-mono" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Source type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: source, onValueChange: setSource, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
            sources.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Camera" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: camera, onValueChange: setCamera, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
            cameras.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Helmet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: helmet, onValueChange: setHelmet, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Any" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yes", children: "With helmet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "no", children: "No helmet" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border/60 bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Vehicle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Helmet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Confidence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "OCR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Camera" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Timestamp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Evidence" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && Array.from({
          length: 6
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({
          length: 8
        }).map((_2, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 animate-pulse rounded bg-muted/40" }) }, j)) }, i)),
        !isLoading && (data || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: FileExclamationPoint, title: "No violations match these filters" }) }) }),
        (data || []).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono font-semibold", children: v.vehicle_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v.helmet_status ? "ok" : "error", label: v.helmet_status ? "Helmet" : "No helmet" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: v.confidence != null ? Math.round(v.confidence) + "%" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: v.ocr_confidence != null ? Math.round(v.ocr_confidence) + "%" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: v.source_type || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: v.camera_name || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground font-mono text-xs", children: format(new Date(v.timestamp), "yyyy-MM-dd HH:mm:ss") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: v.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setPreview(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
            " View"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
        ] }, v.id))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!preview, onOpenChange: (o) => !o && setPreview(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-mono", children: preview?.vehicle_number }) }),
      preview?.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview.image_url, alt: "evidence", className: "max-h-[70vh] w-full rounded-lg object-contain" }),
      preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Camera: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: preview.camera_name || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Source: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: preview.source_type || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "OCR: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            preview.ocr_confidence ?? "—",
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Time: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: format(new Date(preview.timestamp), "PPpp") })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ViolationsPage as component
};
