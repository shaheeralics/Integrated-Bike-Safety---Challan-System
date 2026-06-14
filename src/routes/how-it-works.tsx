import { createFileRoute } from "@tanstack/react-router";
import { PublicNav, PublicFooter } from "@/components/app/PublicNav";
import {
  Camera,
  ShieldAlert,
  ScanLine,
  Search,
  FileText,
  Database,
  BarChart3,
  Repeat,
} from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — IBSCS" },
      { name: "description", content: "The end-to-end detection and challan pipeline used by IBSCS." },
      { property: "og:title", content: "How it works — IBSCS" },
      { property: "og:description", content: "Inside the IBSCS detection pipeline: helmet detection, OCR, challan automation." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { icon: Camera, title: "Input source", desc: "Image, video, webcam, mobile camera or IP/RTSP stream." },
  { icon: ShieldAlert, title: "Helmet detection", desc: "YOLO classifies each rider as with-helmet or without-helmet." },
  { icon: Repeat, title: "Helmet missing?", desc: "If a violation is detected, the pipeline continues. Otherwise the frame is discarded." },
  { icon: ScanLine, title: "Plate detection", desc: "A second YOLO model crops the number plate region above the threshold." },
  { icon: Search, title: "OCR reading", desc: "EasyOCR extracts the plate number. Only readings ≥90% confidence are accepted." },
  { icon: Repeat, title: "Duplicate check", desc: "A 60-minute window prevents repeat challans for the same vehicle." },
  { icon: FileText, title: "Challan generation", desc: "Unique IBSCS-YYYY-###### challan number, PKR 500 default fine." },
  { icon: Database, title: "Evidence storage", desc: "Annotated image uploaded to Supabase Storage with VehicleNumber_Timestamp.jpg name." },
  { icon: BarChart3, title: "Analytics update", desc: "Dashboard KPIs, trends and repeat-offender lists refresh in real time." },
];

function HowItWorks() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent">Pipeline</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">How IBSCS works</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          From any input source to a fully evidenced challan — each step runs server-side on the
          FastAPI backend and writes directly to the database.
        </p>

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex gap-4 rounded-xl border border-border/60 bg-card/60 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-0.5 font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <PublicFooter />
    </div>
  );
}
