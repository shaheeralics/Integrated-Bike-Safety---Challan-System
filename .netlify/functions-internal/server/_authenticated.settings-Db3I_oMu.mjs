import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useForm } from "./_libs/react-hook-form.mjs";
import { u } from "./_libs/hookform__resolvers.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { L as LoaderCircle } from "./_libs/lucide-react.mjs";
import { o as objectType, c as coerce } from "./_libs/zod.mjs";
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
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
const schema = objectType({
  fine_amount: coerce.number().min(0),
  helmet_threshold: coerce.number().min(0).max(100),
  plate_threshold: coerce.number().min(0).max(100),
  ocr_threshold: coerce.number().min(0).max(100),
  duplicate_window: coerce.number().int().min(1),
  frame_interval: coerce.number().int().min(1).max(60)
});
function SettingsPage() {
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("system_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data2 || null;
    }
  });
  const form = useForm({
    resolver: u(schema),
    defaultValues: {
      fine_amount: 500,
      helmet_threshold: 70,
      plate_threshold: 70,
      ocr_threshold: 90,
      duplicate_window: 60,
      frame_interval: 5
    }
  });
  reactExports.useEffect(() => {
    if (data) form.reset(data);
  }, [data, form]);
  const save = useMutation({
    mutationFn: async (v) => {
      if (data?.id) {
        const {
          error
        } = await supabase.from("system_settings").update(v).eq("id", data.id);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("system_settings").insert(v);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({
        queryKey: ["settings"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-64 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) });
  }
  const fields = [{
    name: "fine_amount",
    label: "Fine amount",
    hint: "Issued per challan.",
    suffix: "PKR"
  }, {
    name: "helmet_threshold",
    label: "Helmet detection threshold",
    hint: "Min confidence to flag.",
    suffix: "%"
  }, {
    name: "plate_threshold",
    label: "Plate detection threshold",
    hint: "Min confidence for plate region.",
    suffix: "%"
  }, {
    name: "ocr_threshold",
    label: "OCR threshold",
    hint: "Min confidence to accept OCR.",
    suffix: "%"
  }, {
    name: "duplicate_window",
    label: "Duplicate window",
    hint: "Ignore repeats within window.",
    suffix: "min"
  }, {
    name: "frame_interval",
    label: "Frame interval",
    hint: "Process every Nth frame in video.",
    suffix: "frames"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.handleSubmit((v) => save.mutate(v)), className: "max-w-3xl space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "System settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "These values are read by the detection backend and the dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: f.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "any", ...form.register(f.name) }),
        f.suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-3 top-2 text-xs text-muted-foreground", children: f.suffix })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: f.hint }),
      form.formState.errors[f.name] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: form.formState.errors[f.name]?.message })
    ] }, f.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: save.isPending, children: [
      save.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Save settings"
    ] }) })
  ] }) });
}
export {
  SettingsPage as component
};
