import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanSearch,
  FileWarning,
  Receipt,
  BarChart3,
  Cctv,
  Settings as SettingsIcon,
  Activity,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";

const nav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Detection Center", url: "/detection", icon: ScanSearch },
  { title: "Violations", url: "/violations", icon: FileWarning },
  { title: "Challans", url: "/challans", icon: Receipt },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Camera Management", url: "/cameras", icon: Cctv },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
  { title: "System Health", url: "/health", icon: Activity },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold">IBSCS</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Admin console
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
            {(user?.email || "?").slice(0, 1).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-xs font-medium">{user?.email}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Administrator
              </div>
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
