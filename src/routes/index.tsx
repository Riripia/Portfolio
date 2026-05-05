import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import cottage from "@/assets/cottage.jpg";
import rain from "@/assets/rain.jpg";
import avatar from "@/assets/avatar.png";
import sketchbook from "@/assets/sketchbook.jpg";
import claybear from "@/assets/claybear.jpg";
import zine from "@/assets/zine.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const works = [
  { title: "moss & marigold", tag: "zine • risograph", img: zine, blurb: "a 24-page riso zine about kitchen herbs, tiny windows and the smell of rain." },
  { title: "if the kettle could sing", tag: "stop motion • 02:14", img: claybear, blurb: "a clay bear waits for tea. a meditation on patience, sculpted in plasticine." },
  { title: "field notes vol. iii", tag: "sketchbook • print", img: sketchbook, blurb: "pressed flowers, gouache swatches, and notes from a slow summer." },
  { title: "umbrella weather", tag: "illustration • gouache", img: rain, blurb: "two friends, two mushroom umbrellas, one quiet afternoon of drizzle." },
];

function Index() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    t(); const id = setInterval(t, 30_000); return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 md:px-10 md:py-14">
      {/* floating decorations */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-[var(--moss-soft)] opacity-40 blur-2xl" />
        <div className="absolute right-10 top-1/3 h-56 w-56 rounded-full bg-[var(--tomato-soft)] opacity-30 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-[var(--honey)] opacity-30 blur-3xl" />
      </div>

      {/* Browser window */}
      <div className="mx-auto max-w-6xl">
        <BrowserWindow time={time}>
          <div className="grid gap-6 p-5 md:p-8">
            <Hero />
            <TabsRow />
            <div className="grid gap-6 md:grid-cols-[1.05fr_1fr_1fr]">
              <AboutCard />
              <ScenePolaroid />
              <LinksCard />
            </div>
            <NowPlaying />
            <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
              <CottageCard />
              <WorksList />
            </div>
            <GalleryStrip />
            <Guestbook />
          </div>
          <Marquee />
        </BrowserWindow>

        <Footer />
      </div>
    </main>
  );
}

/* ------------------------------ pieces ------------------------------ */

function BrowserWindow({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="window-shadow rounded-2xl bg-[var(--cream)] overflow-hidden border-2 border-[var(--moss-deep)]">
      {/* title bar */}
      <div className="gingham flex items-center gap-3 px-4 py-2 border-b-2 border-[var(--moss-deep)]">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[var(--tomato)] border border-[var(--moss-deep)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--honey)] border border-[var(--moss-deep)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--moss)] border border-[var(--moss-deep)]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-[var(--cream)] px-3 py-1 text-xs md:text-sm font-pixel text-[var(--moss-deep)] border border-[var(--moss-deep)]">
          🍄 https://moss-and-marigold.carrd.co/ ·· welcome friend ··
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-pixel text-[var(--moss-deep)]">
          <span className="animate-blink">●</span> rec · {time || "––:––"}
        </div>
      </div>
      {/* address bar */}
      <div className="flex items-center gap-2 border-b-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-4 py-2">
        <NavBtn>←</NavBtn>
        <NavBtn>→</NavBtn>
        <NavBtn>↻</NavBtn>
        <div className="flex-1 rounded-full border-2 border-[var(--moss-deep)] bg-[var(--cream)] px-4 py-1 text-sm font-hand text-[var(--ink)]">
          🌱 search the garden…
        </div>
        <span className="hidden md:inline font-marker text-2xl text-[var(--tomato)] -rotate-3">by juno.park</span>
      </div>
      {children}
    </div>
  );
}

function NavBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="grid h-8 w-8 place-items-center rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream)] font-pixel text-[var(--moss-deep)] hover:bg-[var(--moss-soft)] transition-colors">
      {children}
    </button>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-6 md:p-8">
      <div className="absolute inset-0 polka opacity-30" />
      <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] items-center">
        <div className="relative">
          <div className="rounded-2xl border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] p-2 -rotate-3">
            <img src={avatar} alt="pixel portrait of juno" width={128} height={128} className="h-28 w-28 rounded-xl" />
          </div>
          <span className="tape -top-3 left-6 -rotate-12" />
        </div>
        <div>
          <p className="font-pixel text-sm uppercase tracking-widest text-[var(--moss-deep)]">·· hello world ··</p>
          <h1 className="mt-1 text-5xl md:text-7xl leading-none text-[var(--moss-deep)]">
            juno park <span className="text-[var(--tomato)]">✿</span>
          </h1>
          <p className="mt-2 max-w-xl font-hand text-lg text-[var(--ink)]">
            multimedia arts student making zines, stop-motion, sound collages and tender little internet gardens.
            currently brewing tea & a thesis film about <em>moss</em>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill color="moss">she/they</Pill>
            <Pill color="tomato">b. 2003 · seoul ↔ portland</Pill>
            <Pill color="honey">open for collabs</Pill>
          </div>
        </div>
        <div className="hidden md:block animate-float">
          <Mushroom />
        </div>
      </div>
    </section>
  );
}

function Pill({ children, color }: { children: React.ReactNode; color: "moss" | "tomato" | "honey" }) {
  const map = {
    moss: "bg-[var(--moss-soft)] text-[var(--moss-deep)] border-[var(--moss-deep)]",
    tomato: "bg-[var(--tomato-soft)] text-[var(--berry)] border-[var(--berry)]",
    honey: "bg-[var(--honey)] text-[var(--ink)] border-[var(--ink)]",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-0.5 text-xs font-pixel uppercase tracking-wider ${map[color]}`}>
      {children}
    </span>
  );
}

function TabsRow() {
  const tabs = ["✿ about", "✎ works", "❀ comms", "✉ contact", "♡ shrine"];
  return (
    <div className="flex flex-wrap items-end gap-2 border-b-2 border-dashed border-[var(--moss-deep)] pb-1">
      {tabs.map((t, i) => (
        <button key={t}
          className={`group relative -mb-0.5 flex items-center gap-2 rounded-t-xl border-2 border-b-0 border-[var(--moss-deep)] px-4 py-2 font-hand text-base ${i === 0 ? "bg-[var(--cream)] text-[var(--moss-deep)]" : "bg-[var(--cream-deep)] text-[var(--ink)] opacity-80 hover:opacity-100"}`}>
          {t}
          <span className="text-xs text-[var(--tomato)]">✕</span>
        </button>
      ))}
    </div>
  );
}

function AboutCard() {
  return (
    <article className="relative rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-5">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <header className="mb-3 flex items-baseline justify-between border-b-2 border-dashed border-[var(--moss-deep)] pb-2">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">about me 🍄</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">v.07</span>
      </header>
      <p className="font-hand text-base leading-relaxed text-[var(--ink)]">
        hi! i'm <strong>juno</strong>, a fourth-year multimedia arts student at <u className="decoration-dotted">PNCA</u>.
        i make work about small worlds — kitchens, mosses, the way an old tape player hisses before the song starts.
      </p>
      <ul className="mt-3 space-y-1.5 font-hand text-sm">
        <Bullet emoji="🌿">stop-motion & paper puppetry</Bullet>
        <Bullet emoji="📼">field recording & sound collage</Bullet>
        <Bullet emoji="📖">risograph zines (3-color, always)</Bullet>
        <Bullet emoji="🕸">handcoded little websites like this</Bullet>
      </ul>
      <div className="mt-4 rounded-lg border-2 border-dashed border-[var(--tomato)] bg-[var(--tomato-soft)] p-3">
        <p className="font-pixel text-xs uppercase text-[var(--berry)]">currently</p>
        <p className="font-hand text-sm text-[var(--ink)]">growing basil · re-reading <em>the wind in the willows</em> · learning the hammered dulcimer (badly).</p>
      </div>
    </article>
  );
}

function Bullet({ emoji, children }: { emoji: string; children: React.ReactNode }) {
  return <li className="flex gap-2"><span>{emoji}</span><span>{children}</span></li>;
}

function ScenePolaroid() {
  return (
    <div className="relative rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-3">
      <div className="overflow-hidden rounded-lg border-2 border-[var(--moss-deep)]">
        <img src={rain} alt="two creatures with mushroom umbrellas" width={768} height={768} className="aspect-square w-full object-cover" loading="lazy" />
      </div>
      <p className="mt-3 text-center font-marker text-2xl text-[var(--moss-deep)]">·· umbrella weather ··</p>
      <p className="text-center font-hand text-sm text-[var(--ink)]">july 14 · taken on a walk home</p>
      <span className="tape -top-3 left-4 rotate-6" />
      <span className="tape -top-3 right-4 -rotate-6" />
    </div>
  );
}

function LinksCard() {
  const links = [
    { label: "tumblr garden", icon: "🌷", href: "#" },
    { label: "instagram (art)", icon: "🍓", href: "#" },
    { label: "are.na pile", icon: "🍂", href: "#" },
    { label: "bandcamp tapes", icon: "🍄", href: "#" },
    { label: "email me ✉", icon: "🌼", href: "#" },
  ];
  return (
    <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] p-5 relative">
      <h2 className="font-marker text-3xl text-[var(--moss-deep)]">find me here!</h2>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href}
              className="flex items-center gap-3 rounded-lg border-2 border-[var(--moss-deep)] bg-[var(--cream)] px-3 py-2 font-hand text-base text-[var(--moss-deep)] hover:translate-x-1 hover:bg-[var(--honey)] transition-transform">
              <span className="text-xl">{l.icon}</span>
              <span className="underline decoration-dotted underline-offset-2">{l.label}</span>
              <span className="ml-auto font-pixel text-[var(--tomato)]">→</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

function NowPlaying() {
  return (
    <div className="stripes-moss rounded-xl border-2 border-[var(--moss-deep)] px-5 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[var(--cream)]">
        <p className="font-marker text-2xl">♪ now playing — “jardin” by haru nemuri</p>
        <div className="flex items-center gap-2 font-pixel text-sm">
          <span>01:24</span>
          <span className="block h-1.5 w-40 rounded-full bg-[var(--cream)]/40">
            <span className="block h-1.5 w-1/3 rounded-full bg-[var(--honey)]" />
          </span>
          <span>03:48</span>
        </div>
      </div>
    </div>
  );
}

function CottageCard() {
  return (
    <article className="relative overflow-hidden rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-3">
      <div className="overflow-hidden rounded-lg border-2 border-[var(--moss-deep)]">
        <img src={cottage} alt="mushroom cottage" width={768} height={768} className="aspect-square w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-marker text-3xl text-[var(--moss-deep)]">the studio 🏠</h3>
        <p className="font-hand text-base text-[var(--ink)]">
          a tiny room above a bakery. there are too many plants, exactly the right amount of tape, and a film scanner named <em>basil</em>.
        </p>
      </div>
    </article>
  );
}

function WorksList() {
  return (
    <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-5">
      <header className="flex items-baseline justify-between border-b-2 border-dashed border-[var(--moss-deep)] pb-2">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">selected works ✎</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">2023 — 2026</span>
      </header>
      <ul className="mt-3 divide-y-2 divide-dashed divide-[var(--moss)]/40">
        {works.map((w) => (
          <li key={w.title} className="grid grid-cols-[60px_1fr] gap-3 py-3">
            <div className="overflow-hidden rounded-md border-2 border-[var(--moss-deep)]">
              <img src={w.img} alt="" width={60} height={60} className="aspect-square w-full object-cover" loading="lazy" />
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-marker text-xl text-[var(--berry)]">{w.title}</h3>
                <span className="font-pixel text-[10px] uppercase tracking-widest text-[var(--moss-deep)]">{w.tag}</span>
              </div>
              <p className="font-hand text-sm text-[var(--ink)]">{w.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function GalleryStrip() {
  const items = [sketchbook, claybear, zine, rain, cottage];
  return (
    <section className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">·· the polaroid wall ··</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">drag (pretend)</span>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-3">
        {items.map((src, i) => (
          <figure key={i} className={`relative shrink-0 rounded-lg border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-2 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
            <img src={src} alt="" width={180} height={180} className="h-44 w-44 rounded-md object-cover" loading="lazy" />
            <figcaption className="mt-2 text-center font-hand text-sm text-[var(--ink)]">no. 0{i + 1}</figcaption>
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Guestbook() {
  const entries = [
    { who: "miso 🐈", msg: "your zine made me cry on the bus. in a good way." },
    { who: "anon", msg: "the kettle film… i watched it 4 times. please make more." },
    { who: "bea 🌷", msg: "sending pressed flowers in the mail soon!! ♡" },
  ];
  return (
    <section className="grid gap-5 rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-5 md:grid-cols-[1fr_1.4fr]">
      <div>
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">guestbook ✉</h2>
        <p className="mt-1 font-hand text-base text-[var(--ink)]">leave a little note. say hi. tell me what you're growing this season.</p>
        <form className="mt-3 space-y-2" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="your name" className="w-full rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-3 py-2 font-hand placeholder:text-[var(--moss-deep)]/60" />
          <textarea placeholder="a note…" rows={3} className="w-full rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-3 py-2 font-hand placeholder:text-[var(--moss-deep)]/60" />
          <button className="rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] px-5 py-2 font-marker text-xl text-[var(--cream)] hover:bg-[var(--berry)]">
            send with love ♡
          </button>
        </form>
      </div>
      <ul className="space-y-3">
        {entries.map((e, i) => (
          <li key={i} className="relative rounded-lg border-2 border-dashed border-[var(--moss-deep)] bg-[var(--cream-deep)] p-3">
            <p className="font-hand text-base text-[var(--ink)]">"{e.msg}"</p>
            <p className="mt-1 text-right font-marker text-lg text-[var(--berry)]">— {e.who}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Marquee() {
  const text = "✿ thanks for visiting ✿ best viewed with a cup of tea ✿ pls do not steal art ✿ webring of small gardens ✿ ";
  return (
    <div className="border-t-2 border-[var(--moss-deep)] bg-[var(--moss-deep)] py-2 overflow-hidden">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-pixel text-base text-[var(--cream)]">
        {Array.from({ length: 6 }).map((_, i) => <span key={i}>{text}</span>)}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-6 flex flex-wrap items-center justify-between gap-3 px-2 font-hand text-sm text-[var(--moss-deep)]">
      <p>© 2026 juno park · handcoded with care 🍵</p>
      <div className="flex items-center gap-2">
        <a className="underline decoration-dotted">previous</a>
        <span>·· small web ring ··</span>
        <a className="underline decoration-dotted">next →</a>
      </div>
      <p className="font-pixel text-xs">visitor #00427 · last tended 2 days ago</p>
    </footer>
  );
}

function Mushroom() {
  return (
    <svg viewBox="0 0 80 90" className="h-24 w-24 animate-wiggle">
      <ellipse cx="40" cy="35" rx="34" ry="24" fill="oklch(0.62 0.19 25)" stroke="oklch(0.32 0.08 35)" strokeWidth="3" />
      <circle cx="22" cy="30" r="5" fill="oklch(0.97 0.04 90)" />
      <circle cx="50" cy="22" r="4" fill="oklch(0.97 0.04 90)" />
      <circle cx="58" cy="36" r="3" fill="oklch(0.97 0.04 90)" />
      <rect x="32" y="50" width="16" height="32" rx="6" fill="oklch(0.97 0.04 90)" stroke="oklch(0.32 0.08 35)" strokeWidth="3" />
      <circle cx="36" cy="62" r="1.6" fill="oklch(0.32 0.08 35)" />
      <circle cx="44" cy="62" r="1.6" fill="oklch(0.32 0.08 35)" />
      <path d="M36 70 q4 4 8 0" stroke="oklch(0.32 0.08 35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
