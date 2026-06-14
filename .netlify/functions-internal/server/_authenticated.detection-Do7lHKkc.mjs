import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { b as useMutation, u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "./_libs/radix-ui__react-tabs.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./_ssr/select-CZRUt5a6.mjs";
import { b as backend } from "./_ssr/backend-D2SZk2t7.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { S as StatusBadge } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import { U as Upload, V as Video, C as Camera, l as Cctv, L as LoaderCircle, x as CircleX, f as CircleCheck, v as RefreshCw, y as Play, z as Square } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/isbot.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/zod.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function DetectionCenter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "image", className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "image", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
        " Image"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "video", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
        " Video"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "webcam", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
        " Webcam / Mobile"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "ip", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cctv, { className: "h-4 w-4" }),
        " IP Camera"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageTab, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoTab, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webcam", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebcamTab, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ip", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IpTab, {}) })
  ] });
}
function ResultCard({
  r
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
    r.annotated_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.annotated_image, alt: "AI annotated detection result", className: "mb-4 aspect-video w-full rounded-lg border border-border/60 object-contain" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      r.helmet_violation ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "error", label: "Helmet violation" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "ok", label: "No violation" }),
      r.duplicate && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "warn", label: "Duplicate (within window)" }),
      r.vehicle_number && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-xs", children: r.vehicle_number }),
      typeof r.ocr_confidence === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
        "OCR ",
        Math.round(r.ocr_confidence),
        "%"
      ] }),
      typeof r.ocr_accepted === "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.ocr_accepted ? "ok" : "warn", label: `OCR ${r.ocr_accepted ? "accepted" : "rejected"}` }),
      typeof r.processing_time_ms === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[11px] text-muted-foreground", children: [
        Math.round(r.processing_time_ms),
        " ms"
      ] })
    ] }),
    !r.annotated_image && r.evidence_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.evidence_url, alt: "evidence", className: "mt-4 max-h-96 w-full rounded-lg border border-border/60 object-contain" }),
    r.challan ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-primary mb-1", children: "Challan Generated Successfully" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono font-semibold text-primary", children: r.challan.challan_number }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
        "Vehicle: ",
        r.vehicle_number,
        " · Amount: PKR ",
        r.challan.amount,
        " · Status: ",
        r.challan.status
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: r.challan_block_reason ? r.challan_block_reason : "Challan status: Not generated" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DetectionLists, { r })
  ] });
}
function DetectionLists({
  r
}) {
  if (!r.helmet_detections?.length && !r.plate_detections?.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Helmet detections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-xs", children: [
        (r.helmet_detections || []).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between rounded border border-border/60 bg-background/40 px-2 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: d.class }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            Math.round(d.confidence * (d.confidence < 1 ? 100 : 1)),
            "%"
          ] })
        ] }, i)),
        !r.helmet_detections?.length && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "None" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Plate detections" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-xs", children: [
        (r.plate_detections || []).map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between rounded border border-border/60 bg-background/40 px-2 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: d.class }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            Math.round(d.confidence * (d.confidence < 1 ? 100 : 1)),
            "%"
          ] })
        ] }, i)),
        !r.plate_detections?.length && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-muted-foreground", children: "None" })
      ] })
    ] })
  ] });
}
function ImageTab() {
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const m = useMutation({
    mutationFn: (f) => backend.detectImage(f, "image", "manual_upload"),
    onSuccess: (data) => {
      setResult(data);
      if (data.helmet_violation && data.challan) {
        toast.success(`Challan ${data.challan.challan_number} created`);
      } else if (data.helmet_violation && data.duplicate) {
        toast.warning("Violation detected — duplicate within window");
      } else if (!data.helmet_violation) {
        toast("No helmet violation detected");
      }
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Upload an image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "JPG / PNG, max 20MB." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/40 transition hover:border-primary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
          const f = e.target.files?.[0] || null;
          setFile(f);
          setPreview(f ? URL.createObjectURL(f) : null);
          setResult(null);
        } }),
        preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "preview", className: "max-h-full max-w-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto mb-2 h-6 w-6" }),
          "Click to select an image"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !file || m.isPending, onClick: () => file && m.mutate(file), children: [
          m.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Run detection"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
          setFile(null);
          setPreview(null);
          setResult(null);
        }, children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: result ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { r: result }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-sm text-muted-foreground", children: "Results will appear here." }) })
  ] });
}
function VideoTab() {
  const [file, setFile] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const m = useMutation({
    mutationFn: (f) => backend.detectVideo(f, "video-upload"),
    onSuccess: (data) => {
      setResult(data);
      toast.success(`Processed ${data.processed_frames ?? 0} frames`);
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Upload a video" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Backend samples every 5th frame for performance." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-4 flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border bg-background/40 transition hover:border-primary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "video/*", className: "hidden", onChange: (e) => {
          setFile(e.target.files?.[0] || null);
          setResult(null);
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "mx-auto mb-2 h-6 w-6" }),
          file ? file.name : "Click to select a video"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !file || m.isPending, onClick: () => file && m.mutate(file), children: [
        m.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Process video"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
      !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center text-sm text-muted-foreground", children: "Summary will appear here." }),
      result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Frames", value: result.processed_frames ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Results", value: result.total_results ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Challans", value: result.created_challans ?? 0 })
        ] }),
        result.results && result.results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Per-frame results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-96 space-y-2 overflow-auto", children: result.results.slice(0, 50).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-border/60 bg-background/40 p-2 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            r.helmet_violation ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.vehicle_number || "—" }),
            r.challan && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-primary", children: r.challan.challan_number })
          ] }) }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function Mini({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/60 bg-background/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-semibold", children: value })
  ] });
}
function WebcamTab() {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [devices, setDevices] = reactExports.useState([]);
  const [deviceId, setDeviceId] = reactExports.useState("");
  const [running, setRunning] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [frameStatus, setFrameStatus] = reactExports.useState("idle");
  const [frameError, setFrameError] = reactExports.useState(null);
  const sending = reactExports.useRef(false);
  const runningRef = reactExports.useRef(false);
  const timerRef = reactExports.useRef(null);
  async function listDevices() {
    try {
      const permissionStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      const d = (await navigator.mediaDevices.enumerateDevices()).filter((x) => x.kind === "videoinput");
      permissionStream.getTracks().forEach((track) => track.stop());
      setDevices(d);
      if (!deviceId && d[0]) setDeviceId(d[0].deviceId);
    } catch (e) {
      toast.error("Camera permission denied");
    }
  }
  reactExports.useEffect(() => {
    listDevices();
    return () => stop();
  }, []);
  async function start() {
    if (!deviceId) {
      toast.error("Select a camera first");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: {
            exact: deviceId
          }
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        if (videoRef.current.readyState < HTMLMediaElement.HAVE_METADATA) {
          await new Promise((resolve) => {
            videoRef.current?.addEventListener("loadedmetadata", () => resolve(), {
              once: true
            });
          });
        }
        await videoRef.current.play();
      }
      runningRef.current = true;
      setRunning(true);
      setFrameError(null);
      setFrameStatus("idle");
      scheduleFrame(0);
    } catch (e) {
      toast.error(e.message);
    }
  }
  function stop() {
    runningRef.current = false;
    setRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    sending.current = false;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setFrameStatus("idle");
    if (videoRef.current) videoRef.current.srcObject = null;
  }
  function scheduleFrame(delay = 2e3) {
    if (!runningRef.current) return;
    timerRef.current = setTimeout(() => void sendFrame(), delay);
  }
  async function sendFrame() {
    if (!runningRef.current || sending.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      scheduleFrame(250);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFrameError("Browser could not create the frame canvas.");
      setFrameStatus("error");
      scheduleFrame();
      return;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    sending.current = true;
    setFrameStatus("sending");
    try {
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Could not encode camera frame.")), "image/jpeg", 0.82);
      });
      const response = await backend.detectFrame(blob);
      setResult(response);
      setFrameError(null);
      setFrameStatus("received");
      if (response.helmet_violation && response.challan) {
        toast.success(`Challan ${response.challan.challan_number}`);
      }
    } catch (error) {
      if (!runningRef.current) return;
      const message = error instanceof Error ? error.message : "Frame request failed";
      setFrameError(message);
      setFrameStatus("error");
    } finally {
      sending.current = false;
      if (runningRef.current) scheduleFrame();
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[200px] flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Camera" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: deviceId, onValueChange: setDeviceId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: devices.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d.deviceId, children: d.label || `Camera ${d.deviceId.slice(0, 6)}` }, d.deviceId)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", onClick: listDevices, title: "Refresh devices", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-lg border border-border/60 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, className: "aspect-video w-full", muted: true, playsInline: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        !running ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: start, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
          " Start"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: stop, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4" }),
          " Stop"
        ] }),
        running && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "ok", label: "Live" }),
        running && frameStatus === "sending" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "warn", label: "Sending frame…" }),
        running && frameStatus === "received" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "ok", label: "AI response received" }),
        running && frameStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: "error", label: "Frame failed" })
      ] }),
      frameError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: [
        "Backend: ",
        frameError
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: result ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { r: result }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full min-h-72 place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center text-sm text-muted-foreground", children: "Start the camera to see the latest AI processed snapshot." }) })
  ] });
}
function IpTab() {
  const [cameraId, setCameraId] = reactExports.useState("");
  const [cameraUrl, setCameraUrl] = reactExports.useState("");
  const [cameraName, setCameraName] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const list = useQuery({
    queryKey: ["camera_sources", "ip"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camera_sources").select("*").eq("source_type", "ip_camera");
      if (error) throw error;
      return data || [];
    }
  });
  const m = useMutation({
    mutationFn: () => {
      const url = cameraUrl.trim();
      const name = cameraName.trim() || "ip-camera";
      if (!url) throw new Error("Camera URL required");
      return backend.detectIpCamera(url, name);
    },
    onSuccess: (r) => {
      setResult(r);
      if (r.helmet_violation && r.challan) toast.success(`Challan ${r.challan.challan_number}`);
      else if (!r.helmet_violation) toast("No helmet violation detected");
    },
    onError: (e) => toast.error(e.message)
  });
  function pickSaved(id) {
    setCameraId(id);
    const c = list.data?.find((x) => x.id === id);
    if (c) {
      setCameraUrl(c.camera_url || "");
      setCameraName(c.camera_name);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "IP / RTSP camera" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Saved camera (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cameraId, onValueChange: pickSaved, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "— manual entry —" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (list.data || []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.camera_name }, c.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Camera name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cameraName, onChange: (e) => setCameraName(e.target.value), placeholder: "Gate-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Camera URL (RTSP or HTTP)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cameraUrl, onChange: (e) => setCameraUrl(e.target.value), placeholder: "rtsp://user:pass@host:554/stream", className: "font-mono" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: m.isPending, onClick: () => m.mutate(), children: [
        m.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Capture & detect"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: result ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { r: result }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-sm text-muted-foreground", children: "Results will appear here after capturing a frame from the IP camera." }) })
  ] });
}
export {
  DetectionCenter as component
};
