import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import type { CameraSource } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { backend } from "@/lib/backend";
import { Plus, Pencil, Trash2, PlugZap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/app/StatCard";
import { Cctv } from "lucide-react";

export const Route = createFileRoute("/_authenticated/cameras")({
  component: CamerasPage,
});

const schema = z.object({
  camera_name: z.string().min(1, "Required"),
  source_type: z.enum(["webcam", "mobile", "ip_camera"]),
  camera_url: z.string().optional().nullable(),
  is_active: z.boolean(),
});
type FormVals = z.infer<typeof schema>;

function CamerasPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CameraSource | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cameras"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("camera_sources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as CameraSource[];
    },
  });

  const save = useMutation({
    mutationFn: async (v: FormVals) => {
      if (editing) {
        const { error } = await supabase.from("camera_sources").update(v).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("camera_sources").insert(v);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cameras"] });
      toast.success(editing ? "Camera updated" : "Camera added");
      setOpen(false);
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("camera_sources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cameras"] });
      toast.success("Camera removed");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async (c: CameraSource) => {
      const { error } = await supabase
        .from("camera_sources")
        .update({ is_active: !c.is_active })
        .eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cameras"] }),
  });

  const [testing, setTesting] = useState<string | null>(null);
  async function testIp(c: CameraSource) {
    if (!c.camera_url) return toast.error("No URL set");
    setTesting(c.id);
    try {
      const r = await backend.detectIpCamera(c.camera_url, c.camera_name);
      toast.success(`Connected. ${r.message || "Frame captured."}`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setTesting(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4">
        <div>
          <h2 className="text-sm font-semibold">Cameras</h2>
          <p className="text-xs text-muted-foreground">
            Manage webcams, mobile cameras and IP/RTSP streams.
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) setEditing(null);
          }}
        >
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" /> Add camera</Button>
          </DialogTrigger>
          <CameraDialog
            editing={editing}
            submitting={save.isPending}
            onSubmit={(v) => save.mutate(v)}
          />
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}><div className="h-4 animate-pulse rounded bg-muted/40" /></TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading && (data || []).length === 0 && (
              <TableRow><TableCell colSpan={5}>
                <EmptyState icon={Cctv} title="No cameras yet" description="Add your first webcam, mobile camera or IP stream." />
              </TableCell></TableRow>
            )}
            {(data || []).map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-semibold">{c.camera_name}</TableCell>
                <TableCell className="text-muted-foreground">{c.source_type}</TableCell>
                <TableCell className="max-w-xs truncate font-mono text-xs text-muted-foreground">
                  {c.camera_url || "—"}
                </TableCell>
                <TableCell>
                  <Switch checked={c.is_active} onCheckedChange={() => toggle.mutate(c)} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {c.source_type === "ip_camera" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={testing === c.id}
                        onClick={() => testIp(c)}
                      >
                        {testing === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlugZap className="h-4 w-4" />}
                        Test
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditing(c);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete camera "${c.camera_name}"?`)) remove.mutate(c.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CameraDialog({
  editing,
  submitting,
  onSubmit,
}: {
  editing: CameraSource | null;
  submitting: boolean;
  onSubmit: (v: FormVals) => void;
}) {
  const form = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: editing
      ? {
          camera_name: editing.camera_name,
          source_type: (editing.source_type as FormVals["source_type"]) || "ip_camera",
          camera_url: editing.camera_url ?? "",
          is_active: editing.is_active,
        }
      : { camera_name: "", source_type: "ip_camera", camera_url: "", is_active: true },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{editing ? "Edit camera" : "Add camera"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label>Name</Label>
          <Input {...form.register("camera_name")} />
          {form.formState.errors.camera_name && (
            <p className="text-xs text-destructive">{form.formState.errors.camera_name.message}</p>
          )}
        </div>
        <div>
          <Label>Source type</Label>
          <Select
            value={form.watch("source_type")}
            onValueChange={(v) => form.setValue("source_type", v as FormVals["source_type"])}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="webcam">Webcam</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="ip_camera">IP camera</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>URL (RTSP/HTTP) — optional for webcam/mobile</Label>
          <Input className="font-mono" placeholder="rtsp://…" {...form.register("camera_url")} />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border bg-background/40 p-3">
          <Label className="text-sm">Active</Label>
          <Switch
            checked={form.watch("is_active")}
            onCheckedChange={(v) => form.setValue("is_active", v)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />} Save
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
