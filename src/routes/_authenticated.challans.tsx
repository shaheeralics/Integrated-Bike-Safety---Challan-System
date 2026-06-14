import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Challan } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EmptyState, StatusBadge } from "@/components/app/StatCard";
import { Receipt, Download, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/challans")({
  component: ChallansPage,
});

function ChallansPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["challans", { q, status }],
    queryFn: async () => {
      let qb = supabase.from("challans").select("*").order("created_at", { ascending: false }).limit(500);
      if (q) qb = qb.or(`challan_number.ilike.%${q}%,vehicle_number.ilike.%${q}%`);
      if (status !== "all") qb = qb.eq("status", status);
      const { data, error } = await qb;
      if (error) throw error;
      return (data || []) as Challan[];
    },
  });

  const upd = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const patch: { status: string; paid_at: string | null } = {
        status: value,
        paid_at: value === "Paid" ? new Date().toISOString() : null,
      };
      const { error } = await supabase.from("challans").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["challans"] });
      toast.success("Challan updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function exportCsv() {
    const rows = data || [];
    const header = ["challan_number", "vehicle_number", "amount", "status", "created_at", "paid_at"];
    const lines = [header.join(",")].concat(
      rows.map((r) =>
        header
          .map((h) => {
            const v = (r as unknown as Record<string, unknown>)[h];
            const s = v == null ? "" : String(v);
            return `"${s.replace(/"/g, '""')}"`;
          })
          .join(","),
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `challans-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <Label className="text-xs">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Challan or vehicle…"
                className="pl-8 font-mono"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" onClick={exportCsv}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Challan #</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Paid at</TableHead>
              <TableHead className="text-right">Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}><div className="h-4 animate-pulse rounded bg-muted/40" /></TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading && (data || []).length === 0 && (
              <TableRow><TableCell colSpan={7}>
                <EmptyState icon={Receipt} title="No challans" />
              </TableCell></TableRow>
            )}
            {(data || []).map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-semibold">{c.challan_number}</TableCell>
                <TableCell className="font-mono">{c.vehicle_number}</TableCell>
                <TableCell>PKR {c.amount}</TableCell>
                <TableCell>
                  <StatusBadge
                    status={c.status === "Paid" ? "ok" : c.status === "Cancelled" ? "idle" : "warn"}
                    label={c.status}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {format(new Date(c.created_at), "yyyy-MM-dd HH:mm")}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {c.paid_at ? format(new Date(c.paid_at), "yyyy-MM-dd HH:mm") : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Select
                    value={c.status}
                    onValueChange={(value) => upd.mutate({ id: c.id, value })}
                  >
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
