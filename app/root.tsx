import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto min-h-full">
      <div className="flex flex-col flex-wrap py-4">
          <nav className="min-w-screen">
              <div className="sticky p-4 w-full">
                  <ul className="flex flex-row overflow-hidden">
                      <li className="p-10">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="p-10">
                        <Link to="/syntax">Syntax</Link>
                      </li>
                      <li className="p-10">
                        <Link to="/contact">Contact Us</Link>
                      </li>
                  </ul>
              </div>
          </nav>
          <main role="main" className="min-w-screen m-0 pt-1 px-2">
              {children}
          </main>
      </div>
  </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error">
      <Layout>
        <div className="p-4">
          <h1>There was an Error</h1>
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  return (
    <Document title="Error">
      <Layout>
        <section className="prose lg:prose-xl text-center w-screen h-screen m-0">
          <h1>
            {caught.status} {caught.statusText}
          </h1>
          <p>{caught.data}</p>
        </section>
      </Layout>
    </Document>
  );
}

function Document({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body data-theme="dark" className="bg-background text-on-background">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document title="Remix">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}
