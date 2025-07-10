import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useLocation } from "wouter";
import { Loading } from "#/components/loading.tsx";
import { Navbar } from "#/components/navbar.tsx";

const Customer = lazy(() =>
  import("#/pages/customer/customer.tsx").then((module) => ({ default: module.CustomerPage })),
);
const Admin = lazy(() =>
  import("#/pages/admin.tsx").then((module) => ({ default: module.AdminPage })),
);
const About = lazy(() =>
  import("#/pages/about.tsx").then((module) => ({ default: module.AboutPage })),
);
const pages = new Map<string, ReturnType<typeof lazy>>([
  ["/", Customer],
  ["/admin", Admin],
  ["/about", About],
]);

export function App() {
  const [location] = useLocation();
  const Page = pages.get(location);

  return (
    <>
      <Navbar />
      <main className="flex h-screen bg-c5 pt-16 font-roboto-condensed text-c1">
        <div className="container mx-auto px-4 md:px-16">
          <Suspense fallback={<Loading />}>{Page ? <Page /> : <div>not found</div>}</Suspense>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
