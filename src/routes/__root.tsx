import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr. Molnár István EGYMI — Óvoda, Iskola, Kollégium" },
      {
        name: "description",
        content:
          "A Dr. Molnár István Egységes Gyógypedagógiai Módszertani Intézmény, Óvoda, Általános és Készségfejlesztő Iskola, Kollégium hivatalos honlapja — Hajdúböszörmény.",
      },
      { name: "author", content: "Dr. Molnár István EGYMI" },
      { property: "og:title", content: "Dr. Molnár István EGYMI — Óvoda, Iskola, Kollégium" },
      {
        property: "og:description",
        content:
          "Befogadó gyógypedagógiai intézmény Hajdúböszörményben — óvoda, általános és készségfejlesztő iskola, kollégium.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Dr. Molnár István EGYMI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Molnár István EGYMI — Óvoda, Iskola, Kollégium" },
      { name: "description", content: "Digital Study Space is a web application for accessing educational content." },
      { property: "og:description", content: "Digital Study Space is a web application for accessing educational content." },
      { name: "twitter:description", content: "Digital Study Space is a web application for accessing educational content." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4efb914a-2d0f-4c33-9824-51e7edfdce51/id-preview-561bfe8d--55cd1305-741a-4940-a041-e6a0d3a376b2.lovable.app-1781996427995.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4efb914a-2d0f-4c33-9824-51e7edfdce51/id-preview-561bfe8d--55cd1305-741a-4940-a041-e6a0d3a376b2.lovable.app-1781996427995.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Dr. Molnár István Egységes Gyógypedagógiai Módszertani Intézmény, Óvoda, Általános és Készségfejlesztő Iskola, Kollégium",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Radnóti Miklós u. 5.",
            postalCode: "4220",
            addressLocality: "Hajdúböszörmény",
            addressCountry: "HU",
          },
          telephone: "+36-52-561-847",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
