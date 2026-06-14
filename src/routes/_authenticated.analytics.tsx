import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Violation, Challan, CameraSource } from "@/lib/types";
import { StatCard } from "@/components/app/StatCard";
import { FileWarning, Receipt, Car, Cctv } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { format, startOfDay, startOfWeek, startOfMonth, subDays } from "date-fns";

export const Route = createFileRoute("/_authenticated/analytics")({
  component: AnalyticsPage,
});

const COLORS = ["#22d3ee", "#34d399", "#fbbf24", "#fb7185", "#a78bfa"];

function AnalyticsPage() {
  const violations = useQuery({
    queryKey: ["analytics-violations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("violations")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(2000);
      if (error) throw error;
      return (data || []) as Violation[];
    },
  });

  const challans = useQuery({
    queryKey: ["analytics-challans"],
    queryFn: async () => {
      const { count, error } = await supabase.from("challans").select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const vehicles = useQuery({
    queryKey: ["analytics-vehicles"],
    queryFn: async () => {
      const { count, error } = await supabase.from("vehicles").select("id", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const cameras = useQuery({
    queryKey: ["analytics-cameras"],
    queryFn: async () => {
      const { data, error } = await supabase.from("camera_sources").select("*");
      if (error) throw error;
      const rows = (data || []) as CameraSource[];
      return { total: rows.length, active: rows.filter((c) => c.is_active).length };
    },
  });

  const topOffenders = useQuery({
    queryKey: ["analytics-offenders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("total_violations", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data || [];
    },
  });

  const v = violations.data || [];
  const total = v.length;
  const withHelmet = v.filter((x) => x.helmet_status).length;
  const compliance = total ? Math.round((withHelmet / total) * 100) : 0;

  // Daily (last 14 days)
  const daily = (() => {
    const map = new Map<string, number>();
    for (let i = 13; i >= 0; i--) {
      const d = format(subDays(new Date(), i), "MM-dd");
      map.set(d, 0);
    }
    v.forEach((x) => {
      const k = format(startOfDay(new Date(x.timestamp)), "MM-dd");
      if (map.has(k)) map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([day, count]) => ({ day, count }));
  })();

  const weekly = (() => {
    const map = new Map<string, number>();
    v.forEach((x) => {
      const k = format(startOfWeek(new Date(x.timestamp)), "MM-dd");
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([week, count]) => ({ week, count })).slice(-12);
  })();

  const monthly = (() => {
    const map = new Map<string, number>();
    v.forEach((x) => {
      const k = format(startOfMonth(new Date(x.timestamp)), "yyyy-MM");
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([month, count]) => ({ month, count })).slice(-12);
  })();

  const byCamera = (() => {
    const map = new Map<string, number>();
    v.forEach((x) => {
      const k = x.camera_name || "unknown";
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);
  })();

  const bySource = (() => {
    const map = new Map<string, number>();
    v.forEach((x) => {
      const k = x.source_type || "unknown";
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([name, value]) => ({ name, value }));
  })();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Total violations" value={total} icon={FileWarning} tone="destructive" />
        <StatCard label="Total challans" value={challans.data ?? 0} icon={Receipt} tone="primary" />
        <StatCard label="Unique vehicles" value={vehicles.data ?? 0} icon={Car} tone="accent" />
        <StatCard
          label="Active cameras"
          value={`${cameras.data?.active ?? 0}/${cameras.data?.total ?? 0}`}
          icon={Cctv}
          tone="success"
        />
        <StatCard label="Helmet compliance" value={`${compliance}%`} tone={compliance > 70 ? "success" : "warning"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Chart title="Daily violations (last 14 days)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={daily}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Weekly violations">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weekly}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Monthly violations">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthly}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Violations by camera">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCamera} layout="vertical">
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} width={100} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#a78bfa" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Detection source distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={bySource} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {bySource.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Top repeat offenders">
          <div className="max-h-[260px] divide-y divide-border/60 overflow-auto">
            {(topOffenders.data || []).length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">No data yet.</div>
            )}
            {(topOffenders.data || []).map((r, i) => (
              <div key={r.id} className="flex items-center justify-between px-1 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded bg-muted/30 text-[11px] font-mono">
                    {i + 1}
                  </span>
                  <span className="font-mono">{r.vehicle_number}</span>
                </div>
                <span className="font-mono text-destructive">{r.total_violations}</span>
              </div>
            ))}
          </div>
        </Chart>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "rgba(20,24,33,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12,
};

function Chart({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
