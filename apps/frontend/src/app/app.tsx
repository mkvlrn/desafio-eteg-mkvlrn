import { Logo } from "#/components/logo/logo.tsx";
import { Tagline } from "#/components/tagline/tagline.tsx";
import { Title } from "#/components/title/title.tsx";

export function App() {
  return (
    <main className="flex h-screen bg-background font-roboto-condensed text-foreground">
      <div className="m-auto">
        <Title />
        <Tagline />
        <Logo />
      </div>
    </main>
  );
}
