import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import type { SystemSettings } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

const schema = z.object({
  fine_amount: z.coerce.number().min(0),
  helmet_threshold: z.coerce.number().min(0).max(100),
  plate_threshold: z.coerce.number().min(0).max(100),
  ocr_threshold: z.coerce.number().min(0).max(100),
  duplicate_window: z.coerce.number().int().min(1),
  frame_interval: z.coerce.number().int().min(1).max(60),
});
type Form = z.infer<typeof schema>;

function SettingsPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data || null) as SystemSettings | null;
    },
  });

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      fine_amount: 500,
      helmet_threshold: 70,
      plate_threshold: 70,
      ocr_threshold: 90,
      duplicate_window: 60,
      frame_interval: 5,
    },
  });

  useEffect(() => {
    if (data) form.reset(data);
  }, [data, form]);

  const save = useMutation({
    mutationFn: async (v: Form) => {
      if (data?.id) {
        const { error } = await supabase.from("system_settings").update(v).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("system_settings").insert(v);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Settings saved");
      qc.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="grid h-64 place-items-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  const fields: Array<{ name: keyof Form; label: string; hint: string; suffix?: string }> = [
    { name: "fine_amount", label: "Fine amount", hint: "Issued per challan.", suffix: "PKR" },
    { name: "helmet_threshold", label: "Helmet detection threshold", hint: "Min confidence to flag.", suffix: "%" },
    { name: "plate_threshold", label: "Plate detection threshold", hint: "Min confidence for plate region.", suffix: "%" },
    { name: "ocr_threshold", label: "OCR threshold", hint: "Min confidence to accept OCR.", suffix: "%" },
    { name: "duplicate_window", label: "Duplicate window", hint: "Ignore repeats within window.", suffix: "min" },
    { name: "frame_interval", label: "Frame interval", hint: "Process every Nth frame in video.", suffix: "frames" },
  ];

  return (
    <form onSubmit={form.handleSubmit((v) => save.mutate(v))} className="max-w-3xl space-y-4">
      <div className="rounded-xl border border-border/60 bg-card/60 p-5">
        <h2 className="text-sm font-semibold">System settings</h2>
        <p className="text-xs text-muted-foreground">
          These values are read by the detection backend and the dashboard.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name}>
              <Label className="text-xs">{f.label}</Label>
              <div className="relative">
                <Input type="number" step="any" {...form.register(f.name)} />
                {f.suffix && (
                  <span className="pointer-events-none absolute right-3 top-2 text-xs text-muted-foreground">
                    {f.suffix}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{f.hint}</p>
              {form.formState.errors[f.name] && (
                <p className="text-xs text-destructive">{form.formState.errors[f.name]?.message}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save settings
          </Button>
        </div>
      </div>
    </form>
  );
}
