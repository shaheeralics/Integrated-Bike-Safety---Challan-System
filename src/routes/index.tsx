import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Camera,
  ScanLine,
  FileWarning,
  HardDrive,
  LineChart,
  Bike,
  ArrowRight,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicNav, PublicFooter } from "@/components/app/PublicNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IBSCS — AI Helmet Violation Detection & Challan Platform" },
      {
        name: "description",
        content:
          "Detect helmetless riders, read number plates with OCR, and auto-generate challans in real time across any camera source.",
      },
      { property: "og:title", content: "IBSCS — AI Helmet Violation Detection & Challan Platform" },
      {
        property: "og:description",
        content: "AI-powered traffic safety platform with helmet detection, OCR, and challan automation.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-20%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
            <div className="absolute bottom-[-30%] right-[-10%] h-[500px] w-[700px] rounded-full bg-accent/10 blur-[120px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live AI traffic monitoring
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                Helmet violations,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  detected and challaned
                </span>{" "}
                in real time.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                IBSCS combines YOLO computer vision and EasyOCR with a production challan
                workflow — from any camera source straight into your enforcement database.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="glow-cyan">
                  <Link to="/login">
                    Login to dashboard <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/how-it-works">See how it works</Link>
                </Button>
              </div>
            </div>

            {/* Console preview */}
            <div className="mx-auto mt-16 max-w-5xl">
              <div className="glass rounded-2xl p-2 shadow-2xl shadow-primary/5">
                <div className="rounded-xl border border-border/60 bg-card/80">
                  <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
                      <span className="ml-3 font-mono">ibscs / detection-center</span>
                    </div>
                    <div className="font-mono">live · 24 cams</div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
                    {[
                      { label: "Violations today", value: "1,284", tone: "text-destructive" },
                      { label: "Challans generated", value: "1,108", tone: "text-primary" },
                      { label: "Compliance rate", value: "82.4%", tone: "text-success" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-border/60 bg-background/40 p-4">
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {s.label}
                        </div>
                        <div className={`mt-1 font-mono text-2xl font-semibold ${s.tone}`}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-y border-border/60 bg-card/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Platform capabilities
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything an enforcement unit needs.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Built end-to-end: detection, OCR, evidence storage, challan generation and analytics.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-xl border border-border/60 bg-card/60 p-6 transition hover:border-primary/50"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/20">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-base font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                System architecture
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Frontend → AI backend → Database → Dashboard
              </h2>
            </div>
            <div className="mt-10 grid items-stretch gap-3 lg:grid-cols-6">
              {arch.map((a, i) => (
                <div
                  key={a.title}
                  className="relative rounded-xl border border-border/60 bg-card/60 p-5"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-accent/10 text-accent">
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{a.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{a.desc}</div>
                  <div className="mt-3 font-mono text-[10px] text-muted-foreground/70">
                    step {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="glass rounded-2xl border border-primary/30 p-10 text-center glow-cyan">
              <Bike className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Safer roads, automated enforcement.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                Sign in to the IBSCS admin console to monitor cameras, review violations, and
                manage challans.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link to="/login">Login to dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

const features = [
  { icon: ShieldCheck, title: "Helmet violation detection", desc: "YOLO model classifies riders with/without helmets above a configurable confidence threshold." },
  { icon: ScanLine, title: "Number plate OCR", desc: "EasyOCR reads plates and only accepts readings above 90% confidence by default." },
  { icon: FileWarning, title: "Automatic challans", desc: "Unique IBSCS-YYYY-###### challan numbers, with duplicate suppression in a 60-minute window." },
  { icon: HardDrive, title: "Evidence storage", desc: "Annotated evidence images stored in Supabase Storage with deterministic filenames." },
  { icon: Camera, title: "Multi-source cameras", desc: "Image upload, video upload, webcam, mobile camera and RTSP/HTTP IP cameras." },
  { icon: LineChart, title: "Analytics & reporting", desc: "Daily, weekly and monthly trends, repeat offenders, and helmet compliance rate." },
];

const arch = [
  { icon: Camera, title: "Input source", desc: "Image, video, webcam, mobile or IP camera" },
  { icon: Cpu, title: "FastAPI backend", desc: "Hugging Face Spaces inference service" },
  { icon: ShieldCheck, title: "YOLO models", desc: "Helmet + plate detection" },
  { icon: ScanLine, title: "EasyOCR", desc: "Plate text extraction" },
  { icon: Database, title: "Supabase", desc: "Violations · challans · vehicles" },
  { icon: Cloud, title: "Admin dashboard", desc: "Real-time monitoring & control" },
];
