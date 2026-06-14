import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: Layout,
});

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/detection": "Detection Center",
  "/violations": "Violations",
  "/challans": "Challans",
  "/analytics": "Analytics",
  "/cameras": "Camera Management",
  "/settings": "Settings",
  "/health": "System Health",
};

function Layout() {
  const { session, loading } = useAuth();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
    if (!loading && !session) nav({ to: "/login" });
  }, [loading, session, nav]);

  if (loading || !session) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const title = titles[pathname] || "IBSCS";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl">
            <SidebarTrigger />
            <div className="ml-1">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                IBSCS Admin
              </div>
              <div className="text-sm font-semibold leading-none">{title}</div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="hidden h-2 w-2 rounded-full bg-success sm:inline-block" />
              <span className="hidden sm:inline">System online</span>
            </div>
          </header>
          <main className="min-w-0 flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
