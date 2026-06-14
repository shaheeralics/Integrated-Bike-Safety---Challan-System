import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { o as objectType, s as stringType, c as coerce, b as booleanType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BBsvrkWS.css";
const url = "https://odsxnyegwoqxvizzjgve.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kc3hueWVnd29xeHZpenpqZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzE0NzIsImV4cCI6MjA5Njc0NzQ3Mn0.2QcQwoteopk0WRdWSWnPbZIyNRqIW6-lO9e2kpDUA_c";
const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
const Ctx = reactExports.createContext({ session: null, user: null, loading: true, signOut: async () => {
} });
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        session,
        user: session?.user ?? null,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold tracking-tight", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-md border border-input px-4 py-2 text-sm hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IBSCS — Integrated Bike Safety & Challan System" },
      {
        name: "description",
        content: "AI-powered traffic safety platform detecting helmet violations, reading number plates and auto-generating challans."
      },
      { property: "og:title", content: "IBSCS — Integrated Bike Safety & Challan System" },
      {
        property: "og:description",
        content: "AI-powered helmet violation detection and challan management dashboard."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IBSCS — Integrated Bike Safety & Challan System" },
      { name: "description", content: "AI-powered platform detects helmet violations, identifies vehicles, and generates challans." },
      { property: "og:description", content: "AI-powered platform detects helmet violations, identifies vehicles, and generates challans." },
      { name: "twitter:description", content: "AI-powered platform detects helmet violations, identifies vehicles, and generates challans." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, closeButton: true, theme: "dark", position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$c = () => import("./login-DPCQkghO.mjs");
const Route$c = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — IBSCS"
    }, {
      name: "description",
      content: "Administrator sign in for the IBSCS dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
objectType({
  email: stringType().email("Enter a valid email"),
  password: stringType().min(6, "Min 6 characters")
});
const $$splitComponentImporter$b = () => import("./how-it-works-7rlWr0qY.mjs");
const Route$b = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [{
      title: "How it works — IBSCS"
    }, {
      name: "description",
      content: "The end-to-end detection and challan pipeline used by IBSCS."
    }, {
      property: "og:title",
      content: "How it works — IBSCS"
    }, {
      property: "og:description",
      content: "Inside the IBSCS detection pipeline: helmet detection, OCR, challan automation."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./about-BzRaB1XJ.mjs");
const Route$a = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — IBSCS"
    }, {
      name: "description",
      content: "About the Integrated Bike Safety and Challan System (IBSCS)."
    }, {
      property: "og:title",
      content: "About — IBSCS"
    }, {
      property: "og:description",
      content: "Project overview, objectives and technology stack for IBSCS."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_authenticated-BjBE1sGF.mjs");
const Route$9 = createFileRoute("/_authenticated")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-XU2GfHSE.mjs");
const Route$8 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "IBSCS — AI Helmet Violation Detection & Challan Platform"
    }, {
      name: "description",
      content: "Detect helmetless riders, read number plates with OCR, and auto-generate challans in real time across any camera source."
    }, {
      property: "og:title",
      content: "IBSCS — AI Helmet Violation Detection & Challan Platform"
    }, {
      property: "og:description",
      content: "AI-powered traffic safety platform with helmet detection, OCR, and challan automation."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_authenticated.violations-D5RHOpDx.mjs");
const Route$7 = createFileRoute("/_authenticated/violations")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_authenticated.settings-Db3I_oMu.mjs");
const Route$6 = createFileRoute("/_authenticated/settings")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
objectType({
  fine_amount: coerce.number().min(0),
  helmet_threshold: coerce.number().min(0).max(100),
  plate_threshold: coerce.number().min(0).max(100),
  ocr_threshold: coerce.number().min(0).max(100),
  duplicate_window: coerce.number().int().min(1),
  frame_interval: coerce.number().int().min(1).max(60)
});
const $$splitComponentImporter$5 = () => import("../_authenticated.health-CZZsT1BE.mjs");
const Route$5 = createFileRoute("/_authenticated/health")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_authenticated.detection-Do7lHKkc.mjs");
const Route$4 = createFileRoute("/_authenticated/detection")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_authenticated.dashboard-Cz6-7vus.mjs");
const Route$3 = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_authenticated.challans-B3hrq7mQ.mjs");
const Route$2 = createFileRoute("/_authenticated/challans")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_authenticated.cameras-XGwMhtkD.mjs");
const Route$1 = createFileRoute("/_authenticated/cameras")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
objectType({
  camera_name: stringType().min(1, "Required"),
  source_type: enumType(["webcam", "mobile", "ip_camera"]),
  camera_url: stringType().optional().nullable(),
  is_active: booleanType()
});
const $$splitComponentImporter = () => import("../_authenticated.analytics-CXi6gwmC.mjs");
const Route = createFileRoute("/_authenticated/analytics")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const LoginRoute = Route$c.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$d
});
const HowItWorksRoute = Route$b.update({
  id: "/how-it-works",
  path: "/how-it-works",
  getParentRoute: () => Route$d
});
const AboutRoute = Route$a.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$d
});
const AuthenticatedRoute = Route$9.update({
  id: "/_authenticated",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const AuthenticatedViolationsRoute = Route$7.update({
  id: "/violations",
  path: "/violations",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedSettingsRoute = Route$6.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedHealthRoute = Route$5.update({
  id: "/health",
  path: "/health",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedDetectionRoute = Route$4.update({
  id: "/detection",
  path: "/detection",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedDashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedChallansRoute = Route$2.update({
  id: "/challans",
  path: "/challans",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedCamerasRoute = Route$1.update({
  id: "/cameras",
  path: "/cameras",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAnalyticsRoute = Route.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedRouteChildren = {
  AuthenticatedAnalyticsRoute,
  AuthenticatedCamerasRoute,
  AuthenticatedChallansRoute,
  AuthenticatedDashboardRoute,
  AuthenticatedDetectionRoute,
  AuthenticatedHealthRoute,
  AuthenticatedSettingsRoute,
  AuthenticatedViolationsRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute,
  HowItWorksRoute,
  LoginRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  supabase as s,
  useAuth as u
};
