import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <div className="text-sm font-bold tracking-tight">IBSCS</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Bike Safety AI
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/how-it-works">How it works</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/login">Admin dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent/10 hover:text-foreground"
      activeProps={{ className: "text-foreground bg-accent/10" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>IBSCS — Integrated Bike Safety & Challan System</span>
        </div>
        <div>© {new Date().getFullYear()} IBSCS. Final Year Project.</div>
      </div>
    </footer>
  );
}
