import { createFileRoute } from "@tanstack/react-router";
import { PublicNav, PublicFooter } from "@/components/app/PublicNav";
import { Target, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IBSCS" },
      { name: "description", content: "About the Integrated Bike Safety and Challan System (IBSCS)." },
      { property: "og:title", content: "About — IBSCS" },
      { property: "og:description", content: "Project overview, objectives and technology stack for IBSCS." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <PublicNav />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">About</div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          AI-driven traffic safety, built for real enforcement.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The Integrated Bike Safety and Challan System (IBSCS) is a final year project that
          combines computer vision, OCR and a production challan workflow into a single
          deployable platform.
        </p>

        <Section title="Problem" icon={AlertTriangle} tone="text-warning">
          Helmet non-compliance is a leading factor in motorcycle fatalities. Manual enforcement is
          inconsistent and cannot scale to the volume of riders observed by traffic cameras.
        </Section>

        <Section title="Objectives" icon={Target} tone="text-primary">
          <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
            <li>Detect riders without helmets across multiple camera sources.</li>
            <li>Identify the offending vehicle via number-plate OCR.</li>
            <li>Generate a challan automatically with full evidence trail.</li>
            <li>Provide enforcement teams with analytics and repeat-offender intelligence.</li>
          </ul>
        </Section>

        <Section title="Benefits" icon={CheckCircle2} tone="text-success">
          <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
            <li>24/7 automated monitoring without human bottlenecks.</li>
            <li>Tamper-resistant evidence trail in cloud storage.</li>
            <li>Configurable thresholds and fine amounts.</li>
            <li>Scales horizontally — every camera is just another input source.</li>
          </ul>
        </Section>

        <Section title="Technology stack" icon={Cpu} tone="text-accent">
          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((s) => (
              <div key={s.k} className="rounded-lg border border-border/60 bg-card/60 p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.k}</div>
                <div className="mt-1 text-sm font-medium">{s.v}</div>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <PublicFooter />
    </div>
  );
}

const stack = [
  { k: "Frontend", v: "React + TanStack Start + Tailwind + shadcn/ui" },
  { k: "Backend", v: "FastAPI on Hugging Face Spaces" },
  { k: "Detection", v: "YOLO (helmet + number plate)" },
  { k: "OCR", v: "EasyOCR (≥90% confidence)" },
  { k: "Database", v: "Supabase Postgres" },
  { k: "Storage", v: "Supabase Storage (evidence-images)" },
];

function Section({
  title,
  icon: Icon,
  tone,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 rounded-xl border border-border/60 bg-card/40 p-6">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${tone}`} />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="mt-3 text-sm">{children}</div>
    </section>
  );
}
