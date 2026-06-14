import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { s as supabase } from "./_ssr/router-08KTUG_Q.mjs";
import { a as StatCard } from "./_ssr/StatCard-Zn2LfiVH.mjs";
import "./_libs/sonner.mjs";
import { f as format, s as subDays, b as startOfDay, c as startOfWeek, d as startOfMonth } from "./_libs/date-fns.mjs";
import { j as FileExclamationPoint, k as Receipt, E as Car, l as Cctv } from "./_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line, P as PieChart, c as Pie, d as Cell, e as Legend } from "./_libs/recharts.mjs";
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
import "./_libs/lodash.mjs";
import "./_libs/react-smooth.mjs";
import "./_libs/prop-types.mjs";
import "./_libs/fast-equals.mjs";
import "./_libs/tiny-invariant.mjs";
import "./_libs/react-is.mjs";
import "./_libs/d3-shape.mjs";
import "./_libs/d3-path.mjs";
import "./_libs/victory-vendor.mjs";
import "./_libs/d3-scale.mjs";
import "./_libs/internmap.mjs";
import "./_libs/d3-array.mjs";
import "./_libs/d3-time-format.mjs";
import "./_libs/d3-time.mjs";
import "./_libs/d3-interpolate.mjs";
import "./_libs/d3-color.mjs";
import "./_libs/d3-format.mjs";
import "./_libs/recharts-scale.mjs";
import "./_libs/decimal.js-light.mjs";
import "./_libs/eventemitter3.mjs";
const COLORS = ["#22d3ee", "#34d399", "#fbbf24", "#fb7185", "#a78bfa"];
function AnalyticsPage() {
  const violations = useQuery({
    queryKey: ["analytics-violations"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("violations").select("*").order("timestamp", {
        ascending: false
      }).limit(2e3);
      if (error) throw error;
      return data || [];
    }
  });
  const challans = useQuery({
    queryKey: ["analytics-challans"],
    queryFn: async () => {
      const {
        count,
        error
      } = await supabase.from("challans").select("id", {
        count: "exact",
        head: true
      });
      if (error) throw error;
      return count ?? 0;
    }
  });
  const vehicles = useQuery({
    queryKey: ["analytics-vehicles"],
    queryFn: async () => {
      const {
        count,
        error
      } = await supabase.from("vehicles").select("id", {
        count: "exact",
        head: true
      });
      if (error) throw error;
      return count ?? 0;
    }
  });
  const cameras = useQuery({
    queryKey: ["analytics-cameras"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("camera_sources").select("*");
      if (error) throw error;
      const rows = data || [];
      return {
        total: rows.length,
        active: rows.filter((c) => c.is_active).length
      };
    }
  });
  const topOffenders = useQuery({
    queryKey: ["analytics-offenders"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("vehicles").select("*").order("total_violations", {
        ascending: false
      }).limit(10);
      if (error) throw error;
      return data || [];
    }
  });
  const v = violations.data || [];
  const total = v.length;
  const withHelmet = v.filter((x) => x.helmet_status).length;
  const compliance = total ? Math.round(withHelmet / total * 100) : 0;
  const daily = (() => {
    const map = /* @__PURE__ */ new Map();
    for (let i = 13; i >= 0; i--) {
      const d = format(subDays(/* @__PURE__ */ new Date(), i), "MM-dd");
      map.set(d, 0);
    }
    v.forEach((x) => {
      const k = format(startOfDay(new Date(x.timestamp)), "MM-dd");
      if (map.has(k)) map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([day, count]) => ({
      day,
      count
    }));
  })();
  const weekly = (() => {
    const map = /* @__PURE__ */ new Map();
    v.forEach((x) => {
      const k = format(startOfWeek(new Date(x.timestamp)), "MM-dd");
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([week, count]) => ({
      week,
      count
    })).slice(-12);
  })();
  const monthly = (() => {
    const map = /* @__PURE__ */ new Map();
    v.forEach((x) => {
      const k = format(startOfMonth(new Date(x.timestamp)), "yyyy-MM");
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([month, count]) => ({
      month,
      count
    })).slice(-12);
  })();
  const byCamera = (() => {
    const map = /* @__PURE__ */ new Map();
    v.forEach((x) => {
      const k = x.camera_name || "unknown";
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count).slice(0, 8);
  })();
  const bySource = (() => {
    const map = /* @__PURE__ */ new Map();
    v.forEach((x) => {
      const k = x.source_type || "unknown";
      map.set(k, (map.get(k) || 0) + 1);
    });
    return Array.from(map, ([name, value]) => ({
      name,
      value
    }));
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total violations", value: total, icon: FileExclamationPoint, tone: "destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total challans", value: challans.data ?? 0, icon: Receipt, tone: "primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Unique vehicles", value: vehicles.data ?? 0, icon: Car, tone: "accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Active cameras", value: `${cameras.data?.active ?? 0}/${cameras.data?.total ?? 0}`, icon: Cctv, tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Helmet compliance", value: `${compliance}%`, tone: compliance > 70 ? "success" : "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Daily violations (last 14 days)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: daily, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "#22d3ee", radius: [4, 4, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Weekly violations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: weekly, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "week", stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "count", stroke: "#34d399", strokeWidth: 2, dot: false })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Monthly violations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthly, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "#fbbf24", radius: [4, 4, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Violations by camera", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: byCamera, layout: "vertical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", stroke: "rgba(255,255,255,0.4)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { type: "category", dataKey: "name", stroke: "rgba(255,255,255,0.4)", fontSize: 11, width: 100 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "#a78bfa", radius: [0, 4, 4, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Detection source distribution", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: bySource, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 90, paddingAngle: 2, children: bySource.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 11
        } })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { title: "Top repeat offenders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[260px] divide-y divide-border/60 overflow-auto", children: [
        (topOffenders.data || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "No data yet." }),
        (topOffenders.data || []).map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded bg-muted/30 text-[11px] font-mono", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: r.vehicle_number })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-destructive", children: r.total_violations })
        ] }, r.id))
      ] }) })
    ] })
  ] });
}
const tooltipStyle = {
  background: "rgba(20,24,33,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12
};
function Chart({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    children
  ] });
}
export {
  AnalyticsPage as component
};
