import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useForm } from "./_libs/react-hook-form.mjs";
import { u } from "./_libs/hookform__resolvers.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./_ssr/table-RrXKMtST.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./_ssr/dialog-BV96Ob5P.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./_ssr/select-CZRUt5a6.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Switch$1, a as SwitchThumb } from "./_libs/radix-ui__react-switch.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { b as backend } from "./_ssr/backend-D2SZk2t7.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { E as EmptyState } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import { K as Plus, l as Cctv, L as LoaderCircle, M as PlugZap, N as Pencil, O as Trash2 } from "./_libs/lucide-react.mjs";
import { o as objectType, b as booleanType, s as stringType, e as enumType } from "./_libs/zod.mjs";
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
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const schema = objectType({
  camera_name: stringType().min(1, "Required"),
  source_type: enumType(["webcam", "mobile", "ip_camera"]),
  camera_url: stringType().optional().nullable(),
  is_active: booleanType()
});
function CamerasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["cameras"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("camera_sources").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 || [];
    }
  });
  const save = useMutation({
    mutationFn: async (v) => {
      if (editing) {
        const {
          error
        } = await supabase.from("camera_sources").update(v).eq("id", editing.id);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("camera_sources").insert(v);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["cameras"]
      });
      toast.success(editing ? "Camera updated" : "Camera added");
      setOpen(false);
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("camera_sources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["cameras"]
      });
      toast.success("Camera removed");
    },
    onError: (e) => toast.error(e.message)
  });
  const toggle = useMutation({
    mutationFn: async (c) => {
      const {
        error
      } = await supabase.from("camera_sources").update({
        is_active: !c.is_active
      }).eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["cameras"]
    })
  });
  const [testing, setTesting] = reactExports.useState(null);
  async function testIp(c) {
    if (!c.camera_url) return toast.error("No URL set");
    setTesting(c.id);
    try {
      const r = await backend.detectIpCamera(c.camera_url, c.camera_name);
      toast.success(`Connected. ${r.message || "Frame captured."}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setTesting(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Cameras" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage webcams, mobile cameras and IP/RTSP streams." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (o) => {
        setOpen(o);
        if (!o) setEditing(null);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add camera"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CameraDialog, { editing, submitting: save.isPending, onSubmit: (v) => save.mutate(v) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border/60 bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        isLoading && Array.from({
          length: 3
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({
          length: 5
        }).map((_2, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 animate-pulse rounded bg-muted/40" }) }, j)) }, i)),
        !isLoading && (data || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: Cctv, title: "No cameras yet", description: "Add your first webcam, mobile camera or IP stream." }) }) }),
        (data || []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: c.camera_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: c.source_type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate font-mono text-xs text-muted-foreground", children: c.camera_url || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: c.is_active, onCheckedChange: () => toggle.mutate(c) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
            c.source_type === "ip_camera" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", disabled: testing === c.id, onClick: () => testIp(c), children: [
              testing === c.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlugZap, { className: "h-4 w-4" }),
              "Test"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              setEditing(c);
              setOpen(true);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
              if (confirm(`Delete camera "${c.camera_name}"?`)) remove.mutate(c.id);
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
          ] }) })
        ] }, c.id))
      ] })
    ] }) })
  ] });
}
function CameraDialog({
  editing,
  submitting,
  onSubmit
}) {
  const form = useForm({
    resolver: u(schema),
    defaultValues: editing ? {
      camera_name: editing.camera_name,
      source_type: editing.source_type || "ip_camera",
      camera_url: editing.camera_url ?? "",
      is_active: editing.is_active
    } : {
      camera_name: "",
      source_type: "ip_camera",
      camera_url: "",
      is_active: true
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit camera" : "Add camera" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...form.register("camera_name") }),
        form.formState.errors.camera_name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.camera_name.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Source type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.watch("source_type"), onValueChange: (v) => form.setValue("source_type", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webcam", children: "Webcam" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mobile", children: "Mobile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ip_camera", children: "IP camera" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL (RTSP/HTTP) — optional for webcam/mobile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "font-mono", placeholder: "rtsp://…", ...form.register("camera_url") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: form.watch("is_active"), onCheckedChange: (v) => form.setValue("is_active", v) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: submitting, children: [
        submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Save"
      ] }) })
    ] })
  ] });
}
export {
  CamerasPage as component
};
