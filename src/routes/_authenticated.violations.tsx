import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Violation } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState, StatusBadge } from "@/components/app/StatCard";
import { FileWarning, ImageIcon, Search } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/_authenticated/violations")({
  component: ViolationsPage,
});

function ViolationsPage() {
  const [q, setQ] = useState("");
  const [source, setSource] = useState<string>("all");
  const [camera, setCamera] = useState<string>("all");
  const [helmet, setHelmet] = useState<string>("all");
  const [date, setDate] = useState<string>("");
  const [preview, setPreview] = useState<Violation | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["violations", { q, source, camera, helmet, date }],
    queryFn: async () => {
      let qb = supabase.from("violations").select("*").order("timestamp", { ascending: false }).limit(500);
      if (q) qb = qb.ilike("vehicle_number", `%${q}%`);
      if (source !== "all") qb = qb.eq("source_type", source);
      if (camera !== "all") qb = qb.eq("camera_name", camera);
      if (helmet !== "all") qb = qb.eq("helmet_status", helmet === "yes");
      if (date) {
        const start = new Date(date + "T00:00:00Z").toISOString();
        const end = new Date(date + "T23:59:59Z").toISOString();
        qb = qb.gte("timestamp", start).lte("timestamp", end);
      }
      const { data, error } = await qb;
      if (error) throw error;
      return (data || []) as Violation[];
    },
  });

  const sources = useMemo(
    () => Array.from(new Set((data || []).map((v) => v.source_type).filter(Boolean) as string[])),
    [data],
  );
  const cameras = useMemo(
    () => Array.from(new Set((data || []).map((v) => v.camera_name).filter(Boolean) as string[])),
    [data],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card/60 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Label className="text-xs">Vehicle number</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-8 font-mono" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Source type</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {sources.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Camera</Label>
            <Select value={camera} onValueChange={setCamera}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {cameras.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Helmet</Label>
            <Select value={helmet} onValueChange={setHelmet}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="yes">With helmet</SelectItem>
                <SelectItem value="no">No helmet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Helmet</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>OCR</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Camera</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Evidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <TableCell key={j}><div className="h-4 animate-pulse rounded bg-muted/40" /></TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading && (data || []).length === 0 && (
              <TableRow><TableCell colSpan={8}>
                <EmptyState icon={FileWarning} title="No violations match these filters" />
              </TableCell></TableRow>
            )}
            {(data || []).map((v) => (
              <TableRow key={v.id}>
                <TableCell className="font-mono font-semibold">{v.vehicle_number}</TableCell>
                <TableCell>
                  <StatusBadge status={v.helmet_status ? "ok" : "error"} label={v.helmet_status ? "Helmet" : "No helmet"} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {v.confidence != null ? Math.round(v.confidence) + "%" : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {v.ocr_confidence != null ? Math.round(v.ocr_confidence) + "%" : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">{v.source_type || "—"}</TableCell>
                <TableCell className="text-muted-foreground">{v.camera_name || "—"}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {format(new Date(v.timestamp), "yyyy-MM-dd HH:mm:ss")}
                </TableCell>
                <TableCell className="text-right">
                  {v.image_url ? (
                    <Button variant="ghost" size="sm" onClick={() => setPreview(v)}>
                      <ImageIcon className="h-4 w-4" /> View
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-mono">{preview?.vehicle_number}</DialogTitle>
          </DialogHeader>
          {preview?.image_url && (
            <img src={preview.image_url} alt="evidence" className="max-h-[70vh] w-full rounded-lg object-contain" />
          )}
          {preview && (
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
              <div>Camera: <span className="text-foreground">{preview.camera_name || "—"}</span></div>
              <div>Source: <span className="text-foreground">{preview.source_type || "—"}</span></div>
              <div>OCR: <span className="text-foreground">{preview.ocr_confidence ?? "—"}%</span></div>
              <div>Time: <span className="text-foreground">{format(new Date(preview.timestamp), "PPpp")}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
