import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import Bea from "@/assets/6093750284933861391.jpg";
import petra from "@/assets/6093750284933861403.jpg";
import tanghals11 from "@/assets/6093750284933861408.jpg";
import avatar from "@/assets/60937502849338613892.jpg";
import beach from "@/assets/6093750284933861374.jpg";
import Up from "@/assets/6093750284933861397.jpg";
import zine from "@/assets/6093750284933861395.jpg";
import Stopmotion from "@/assets/6093750284933861395.jpg";
import euphoriaDubbing from "@/assets/EUPHORIA_dubbing.mp4";
import beatMatching from "@/assets/CAxTNBH_Beat_Matching.m4a";
import latchMedley from "@/assets/Latch_medley.m4a";
import promiscuousRemix from "@/assets/promiscuous_remix.m4a";
import rocketeerMashup from "@/assets/rocketeer_mashup.m4a";
import sportscarCutUp from "@/assets/sportscar cut up.m4a";
import missPossessive from "@/assets/Tate McRae - Miss possessive (Lyric Video).mp3";
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  Heart,
  ListMusic,
  Maximize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  component: Index,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type TabId = "about" | "works" | "projects" | "comms" | "contact" | "shrine";

interface AudioTrack {
  name: string;
  url: string;
  duration?: number;
}

interface MediaProject {
  title: string;
  subtitle: string;
  url: string;
  kind: "audio" | "video";
}

// ─── Static data ─────────────────────────────────────────────────────────────

const works = [
  { title: "Photography", tag: "Passion Projects", img: Bea, blurb: "a compilation of photos i took" },
  { title: "Stop Motion", tag: "stop motion • 02:14", img: Up, blurb: "a clay bear waits for tea. a meditation on patience, sculpted in plasticine." },
  { title: "Production Projects", tag: "beach • print", img: beach, blurb: "pressed flowers, gouache swatches, and notes from a slow summer." },
  { title: "UI/UX Designs", tag: "illustration • gouache", img: tanghals11, blurb: "two friends, two mushroom umbrellas, one quiet afternoon of drizzle." },
];

const TABS: { id: TabId; label: string }[] = [
  { id: "about",    label: "✿ about"    },
  { id: "works",    label: "✎ works"    },
  { id: "projects", label: "🎮 projects" },
  { id: "comms",    label: "❀ comms"    },
  { id: "contact",  label: "✉ contact"  },
  { id: "shrine",   label: "♡ shrine"   },
];

const audioEngineeringProjects: MediaProject[] = [
  { title: "EUPHORIA Dubbing", subtitle: "Dubbing and sound redesign", url: euphoriaDubbing, kind: "video" },
  { title: "CAxTNBH Beat Matching", subtitle: "Beat matching study", url: beatMatching, kind: "audio" },
  { title: "Latch Medley", subtitle: "Medley and arrangement", url: latchMedley, kind: "audio" },
  { title: "Promiscuous Remix", subtitle: "Remix and edit", url: promiscuousRemix, kind: "audio" },
  { title: "Rocketeer Mashup", subtitle: "Mashup experiment", url: rocketeerMashup, kind: "audio" },
  { title: "Sportscar Cut Up", subtitle: "Cut-up exercise", url: sportscarCutUp, kind: "audio" },
  { title: "Miss Possessive", subtitle: "Lyric video audio", url: missPossessive, kind: "audio" },
];

// ─── Root component ───────────────────────────────────────────────────────────

export function Index() {
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("about");

  useEffect(() => {
    const t = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    t();
    const id = setInterval(t, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 md:px-10 md:py-14">
      {/* floating decorations */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-[var(--moss-soft)] opacity-40 blur-2xl" />
        <div className="absolute right-10 top-1/3 h-56 w-56 rounded-full bg-[var(--tomato-soft)] opacity-30 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-[var(--honey)] opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <BrowserWindow time={time}>
          <div className="grid gap-6 p-5 md:p-8">
            <Hero />
            {/* ── Tab bar ── */}
            <TabsRow activeTab={activeTab} onTabChange={setActiveTab} />
            {/* ── Tab panels ── */}
            <TabPanel activeTab={activeTab} />
          </div>
          <Marquee />
        </BrowserWindow>

        <Footer />
      </div>
    </main>
  );
}

// ─── Browser chrome ───────────────────────────────────────────────────────────

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
          🍄 https://vaniillaberri.portfolio.co/ ·· welcome friend ··
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
        <span className="hidden md:inline font-marker text-2xl text-[var(--tomato)] -rotate-3">by Vaniillaberri</span>
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-6 md:p-8">
      <div className="absolute inset-0 polka opacity-30" />
      <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] items-center">
        <div className="relative">
          <div className="w-40 bg-white p-3 shadow-lg -rotate-3">
            <div className="bg-[var(--cream-deep)] overflow-hidden">
              <img src={avatar} alt="pixel portrait" width={128} height={128} className="w-full h-32 object-cover" />
            </div>
            <div className="mt-3 h-8 bg-white" />
          </div>
          <span className="tape -top-2 left-4 -rotate-12 absolute" />
          <span className="tape -top-2 right-6 rotate-6 absolute" />
        </div>
        <div>
          <p className="font-pixel text-sm uppercase tracking-widest text-[var(--moss-deep)]">·· hello world ··</p>
          <h1 className="mt-1 text-5xl md:text-7xl leading-none text-[var(--moss-deep)]">
            Caurie M. Piamonte <span className="text-[var(--tomato)]">✿</span>
          </h1>
          <p className="mt-2 max-w-xl font-hand text-lg text-[var(--ink)]">
            a multimedia arts student and aspiring game developer, drifting between animation, stop motion, and photography.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill color="moss">she/her</Pill>
            <Pill color="tomato">b. 2005 · Manila</Pill>
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

// ─── Tab bar (now functional) ─────────────────────────────────────────────────

function TabsRow({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <div className="flex flex-wrap items-end gap-2 border-b-2 border-dashed border-[var(--moss-deep)] pb-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`group relative -mb-0.5 flex items-center gap-2 rounded-t-xl border-2 border-b-0 border-[var(--moss-deep)] px-4 py-2 font-hand text-base transition-colors ${
            activeTab === tab.id
              ? "bg-[var(--cream)] text-[var(--moss-deep)]"
              : "bg-[var(--cream-deep)] text-[var(--ink)] opacity-80 hover:opacity-100 hover:bg-[var(--cream)]"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="text-xs text-[var(--tomato)]">✕</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Tab panel router ─────────────────────────────────────────────────────────

function TabPanel({ activeTab }: { activeTab: TabId }) {
  switch (activeTab) {
    case "about":    return <AboutTab />;
    case "works":    return <WorksTab />;
    case "projects": return <ProjectsTab />;
    case "comms":    return <CommsTab />;
    case "contact":  return <ContactTab />;
    case "shrine":   return <ShrineTab />;
  }
}

// ─── About tab (original layout) ─────────────────────────────────────────────

function AboutTab() {
  return (
    <>
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
    </>
  );
}

// ─── Works tab ────────────────────────────────────────────────────────────────

function WorksTab() {
  const [selectedWork, setSelectedWork] = useState<(typeof works)[0] | null>(null);

  return (
    <section className="grid gap-6">
      <header className="flex items-baseline justify-between border-b-2 border-dashed border-[var(--moss-deep)] pb-2">
        <h2 className="font-marker text-4xl text-[var(--moss-deep)]">selected works ✎</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">2023 — 2026</span>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {works.map((w) => (
          <article key={w.title} className="relative rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] overflow-hidden">
            <div className="h-52 overflow-hidden border-b-2 border-[var(--moss-deep)]">
              <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-marker text-2xl text-[var(--berry)]">{w.title}</h3>
                <span className="font-pixel text-[10px] uppercase tracking-widest text-[var(--moss-deep)]">{w.tag}</span>
              </div>
              <p className="mt-1 font-hand text-sm text-[var(--ink)]">{w.blurb}</p>
              <button
                onClick={() => setSelectedWork(w)}
                className="mt-3 rounded-full border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] px-4 py-1 font-pixel text-sm text-[var(--moss-deep)] hover:bg-[var(--moss)] hover:text-[var(--cream)] transition-colors">
                view project →
              </button>
            </div>
          </article>
        ))}
      </div>
      {/* Audio player section */}
      <AudioUploader />

      {/* Project viewer modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border-4 border-[var(--moss-deep)] bg-[var(--cream)] p-8">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] font-marker text-xl text-[var(--cream)] hover:bg-[var(--berry)] transition-colors"
            >
              ✕
            </button>
            <img src={selectedWork.img} alt={selectedWork.title} className="w-full rounded-xl border-2 border-[var(--moss-deep)] object-cover" />
            <h2 className="mt-6 font-marker text-4xl text-[var(--moss-deep)]">{selectedWork.title}</h2>
            <p className="mt-2 font-pixel text-xs uppercase text-[var(--tomato)]">{selectedWork.tag}</p>
            <p className="mt-4 font-hand text-lg text-[var(--ink)]">{selectedWork.blurb}</p>
            <div className="mt-6 space-y-2">
              <p className="font-marker text-xl text-[var(--berry)]">details</p>
              <p className="font-hand text-sm text-[var(--ink)]">click to edit this project description and add more details about your process, materials, or inspiration.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Projects tab ─────────────────────────────────────────────────────────────

function ProjectsTab() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="grid gap-6">
      <header className="flex items-baseline justify-between border-b-2 border-dashed border-[var(--moss-deep)] pb-2">
        <h2 className="font-marker text-4xl text-[var(--moss-deep)]">projects 🎮</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">sound portfolio</span>
      </header>

      <article className="overflow-hidden rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)]">
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <button
            type="button"
            onClick={() => setSelectedIndex(0)}
            className="group relative min-h-72 overflow-hidden bg-[#191414] text-left"
          >
            <video src={euphoriaDubbing} muted preload="metadata" className="h-full min-h-72 w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
            <span className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-full bg-[#1ed760] text-black shadow-xl transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
            <p className="absolute bottom-6 left-24 font-pixel text-sm uppercase tracking-widest text-white">play featured video</p>
          </button>

          <div className="p-6 md:p-8">
            <p className="font-pixel text-xs uppercase tracking-[0.25em] text-[var(--tomato)]">selected project</p>
            <h3 className="mt-1 font-marker text-4xl text-[var(--berry)]">Audio Engineering</h3>
            <p className="mt-2 font-hand text-base text-[var(--ink)]">
              Dubbing, beat matching, mashups, remixes, and sound edits exploring rhythm, storytelling, and the shape of a good transition.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Dubbing", "Mixing", "Beat Matching", "Sound Design"].map((tag) => (
                <span key={tag} className="rounded-full border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] px-3 py-1 font-pixel text-xs text-[var(--moss-deep)]">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectedIndex(0)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] px-5 py-2 font-marker text-lg text-[var(--cream)] transition-colors hover:bg-[var(--berry)]"
            >
              <ListMusic className="h-5 w-5" />
              open media player
            </button>
          </div>
        </div>
      </article>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {audioEngineeringProjects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group flex items-center gap-3 rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] p-3 text-left transition hover:-translate-y-0.5 hover:bg-[var(--moss-soft)]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[var(--moss-deep)] text-[var(--cream)]">
              {project.kind === "video" ? <Play className="h-5 w-5 fill-current" /> : <Disc3 className="h-6 w-6 transition-transform group-hover:rotate-45" />}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-marker text-lg text-[var(--berry)]">{project.title}</span>
              <span className="block truncate font-pixel text-xs text-[var(--ink)]/70">{project.subtitle}</span>
            </span>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <GardenMediaPlayerModal
          projects={audioEngineeringProjects}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}

function GardenMediaPlayerModal({
  projects,
  initialIndex,
  onClose,
}: {
  projects: MediaProject[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const current = projects[currentIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function connectMedia(element: HTMLMediaElement | null) {
    mediaRef.current = element;
    if (element) element.volume = volume;
  }

  function togglePlay() {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused) {
      media.play().catch(() => setIsPlaying(false));
    } else {
      media.pause();
    }
  }

  function selectTrack(index: number) {
    mediaRef.current?.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setCurrentIndex(index);
  }

  function moveTrack(direction: -1 | 1) {
    selectTrack((currentIndex + direction + projects.length) % projects.length);
  }

  function formatTime(value: number) {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const mediaEvents = {
    onTimeUpdate: (event: React.SyntheticEvent<HTMLMediaElement>) =>
      setCurrentTime(event.currentTarget.currentTime),
    onLoadedMetadata: (event: React.SyntheticEvent<HTMLMediaElement>) => {
      event.currentTarget.volume = volume;
      setDuration(event.currentTarget.duration);
    },
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onEnded: () => moveTrack(1),
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--moss-deep)]/65 p-3 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Audio engineering media player"
        onMouseDown={(event) => event.stopPropagation()}
        className="window-shadow relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] text-[var(--ink)]"
      >
        <div className="gingham flex items-center gap-3 border-b-2 border-[var(--moss-deep)] px-4 py-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full border border-[var(--moss-deep)] bg-[var(--tomato)]" />
            <span className="h-3 w-3 rounded-full border border-[var(--moss-deep)] bg-[var(--honey)]" />
            <span className="h-3 w-3 rounded-full border border-[var(--moss-deep)] bg-[var(--moss)]" />
          </div>
          <div className="flex-1 rounded-md border border-[var(--moss-deep)] bg-[var(--cream)] px-3 py-1 font-pixel text-sm text-[var(--moss-deep)]">
            ♪ audio-engineering.player
          </div>
          <button type="button" onClick={onClose} aria-label="Close player" className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] text-[var(--cream)] transition hover:bg-[var(--berry)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_310px]">
          <div className="polka min-h-0 overflow-y-auto p-5 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-pixel text-xs uppercase tracking-[0.25em] text-[var(--tomato)]">now playing</p>
                <p className="font-hand text-sm text-[var(--moss-deep)]">sound archive · track {currentIndex + 1} of {projects.length}</p>
              </div>
              <span className="rotate-2 rounded-full border-2 border-[var(--berry)] bg-[var(--tomato-soft)] px-3 py-1 font-pixel text-xs text-[var(--berry)]">
                {current.kind}
              </span>
            </div>

            {current.kind === "video" ? (
              <video
                key={current.url}
                ref={connectMedia}
                src={current.url}
                playsInline
                preload="metadata"
                onClick={togglePlay}
                className="aspect-video w-full cursor-pointer rounded-xl border-2 border-[var(--moss-deep)] bg-black object-contain shadow-lg"
                {...mediaEvents}
              />
            ) : (
              <>
                <audio key={current.url} ref={connectMedia} src={current.url} preload="metadata" {...mediaEvents} />
                <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] shadow-lg">
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-[var(--moss-deep)]/40" />
                  <Disc3 className={`h-36 w-36 text-[var(--moss-deep)] ${isPlaying ? "animate-spin-slow" : ""}`} />
                  <span className="tape absolute -top-2 left-1/2 -translate-x-1/2 -rotate-2" />
                </div>
              </>
            )}

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-marker text-3xl text-[var(--berry)] md:text-5xl">{current.title}</h2>
                <p className="mt-1 font-hand text-base">{current.subtitle} · Caurie M. Piamonte</p>
              </div>
              <span className="text-3xl text-[var(--tomato)]">♡</span>
            </div>
          </div>

          <aside className="gingham-green min-h-0 overflow-y-auto border-l-2 border-[var(--moss-deep)] p-4">
            <h3 className="font-marker text-2xl text-[var(--moss-deep)]">playlist ♪</h3>
            <p className="mb-3 font-pixel text-xs text-[var(--ink)]/70">choose a track, then press play</p>
            <div className="space-y-2">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => selectTrack(index)}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-2 text-left transition ${
                    index === currentIndex
                      ? "border-[var(--berry)] bg-[var(--tomato-soft)]"
                      : "border-[var(--moss-deep)] bg-[var(--cream)] hover:bg-[var(--honey)]"
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--moss-deep)] bg-[var(--moss-soft)]">
                    {index === currentIndex && isPlaying ? (
                      <Volume2 className="h-4 w-4 text-[var(--berry)]" />
                    ) : (
                      <span className="font-pixel text-xs text-[var(--moss-deep)]">{String(index + 1).padStart(2, "0")}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-marker text-lg text-[var(--berry)]">{project.title}</span>
                    <span className="block truncate font-pixel text-xs text-[var(--ink)]/65">{project.subtitle}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="stripes-moss border-t-2 border-[var(--moss-deep)] px-4 py-3 text-[var(--cream)]">
          <div className="mx-auto mb-2 flex max-w-xl items-center gap-3 font-pixel text-xs">
            <span className="w-9 text-right">{formatTime(currentTime)}</span>
            <input
              aria-label="Playback position"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (mediaRef.current) mediaRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
              className="garden-range flex-1"
            />
            <span className="w-9">{formatTime(duration)}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate font-marker text-lg">{current.title}</p>
              <p className="truncate font-pixel text-xs text-[var(--cream)]/75">Caurie M. Piamonte</p>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous track" className="hover:text-[var(--honey)]"><SkipBack className="h-5 w-5 fill-current" /></button>
              <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--cream)] bg-[var(--tomato)] transition hover:scale-105 hover:bg-[var(--berry)]">
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
              </button>
              <button type="button" onClick={() => moveTrack(1)} aria-label="Next track" className="hover:text-[var(--honey)]"><SkipForward className="h-5 w-5 fill-current" /></button>
            </div>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <Volume2 className="h-4 w-4" />
              <input
                aria-label="Volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => {
                  const nextVolume = Number(event.target.value);
                  setVolume(nextVolume);
                  if (mediaRef.current) mediaRef.current.volume = nextVolume;
                }}
                className="garden-range w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaPlayerModal({
  projects,
  initialIndex,
  onClose,
}: {
  projects: MediaProject[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const current = projects[currentIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function togglePlay() {
    const media = mediaRef.current;
    if (!media) return;
    if (media.paused) {
      media.play().catch(() => setIsPlaying(false));
    } else {
      media.pause();
    }
  }

  function selectTrack(index: number) {
    setCurrentTime(0);
    setDuration(0);
    setCurrentIndex(index);
  }

  function moveTrack(direction: -1 | 1) {
    selectTrack((currentIndex + direction + projects.length) % projects.length);
  }

  function formatTime(value: number) {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Audio engineering media player"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] text-white shadow-2xl"
      >
        <button type="button" onClick={onClose} aria-label="Close player" className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black">
          <X className="h-5 w-5" />
        </button>

        <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_300px]">
          <div className="min-h-0 overflow-y-auto bg-gradient-to-b from-[#315c46] via-[#18251e] to-[#121212] p-5 md:p-8">
            <div className="mb-6 flex gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black/50"><ChevronLeft className="h-5 w-5" /></span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black/30"><ChevronRight className="h-5 w-5" /></span>
            </div>

            {current.kind === "video" ? (
              <video
                key={current.url}
                ref={mediaRef}
                src={current.url}
                playsInline
                preload="metadata"
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onLoadedMetadata={(event) => {
                  event.currentTarget.volume = volume;
                  setDuration(event.currentTarget.duration);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => moveTrack(1)}
                className="aspect-video w-full rounded-lg bg-black object-contain shadow-2xl"
              />
            ) : (
              <>
                <video
                  key={current.url}
                  ref={mediaRef}
                  src={current.url}
                  playsInline
                  preload="metadata"
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onLoadedMetadata={(event) => {
                    event.currentTarget.volume = volume;
                    setDuration(event.currentTarget.duration);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => moveTrack(1)}
                  className="hidden"
                />
                <div className="mx-auto grid aspect-square w-full max-w-md place-items-center rounded-lg bg-gradient-to-br from-[#1ed760] via-[#315c46] to-[#0b1710] shadow-2xl">
                  <Disc3 className={`h-36 w-36 text-black/75 ${isPlaying ? "animate-spin-slow" : ""}`} />
                </div>
              </>
            )}

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/65">{current.kind} project</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight md:text-5xl">{current.title}</h2>
                <p className="mt-2 text-sm text-white/70">{current.subtitle} · Caurie M. Piamonte</p>
              </div>
              <Heart className="h-7 w-7 shrink-0 text-[#1ed760]" />
            </div>
          </div>

          <aside className="min-h-0 overflow-y-auto border-l border-white/10 bg-[#181818] p-4">
            <h3 className="mb-3 text-sm font-bold">Audio Engineering</h3>
            <div className="space-y-1">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => selectTrack(index)}
                  className={`flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-white/10 ${index === currentIndex ? "bg-white/10" : ""}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-[#282828]">
                    {index === currentIndex && isPlaying ? <Volume2 className="h-4 w-4 text-[#1ed760]" /> : <span className="text-xs text-white/60">{index + 1}</span>}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-sm font-semibold ${index === currentIndex ? "text-[#1ed760]" : "text-white"}`}>{project.title}</span>
                    <span className="block truncate text-xs text-white/55">{project.subtitle}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <div className="border-t border-white/10 bg-[#181818] px-4 py-3">
          <div className="mx-auto mb-2 flex max-w-xl items-center gap-3 text-[11px] text-white/60">
            <span className="w-9 text-right">{formatTime(currentTime)}</span>
            <input
              aria-label="Playback position"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => {
                const nextTime = Number(event.target.value);
                if (mediaRef.current) mediaRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
              className="spotify-range flex-1"
            />
            <span className="w-9">{formatTime(duration)}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{current.title}</p>
              <p className="truncate text-xs text-white/50">Caurie M. Piamonte</p>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous track" className="text-white/70 hover:text-white"><SkipBack className="h-5 w-5 fill-current" /></button>
              <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:scale-105">
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
              </button>
              <button type="button" onClick={() => moveTrack(1)} aria-label="Next track" className="text-white/70 hover:text-white"><SkipForward className="h-5 w-5 fill-current" /></button>
            </div>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <Volume2 className="h-4 w-4 text-white/60" />
              <input
                aria-label="Volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => {
                  const nextVolume = Number(event.target.value);
                  setVolume(nextVolume);
                  if (mediaRef.current) mediaRef.current.volume = nextVolume;
                }}
                className="spotify-range w-24"
              />
              <Maximize2 className="h-4 w-4 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Audio uploader + player ──────────────────────────────────────────────────

function AudioUploader() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync audio element with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrack]);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newTracks: AudioTrack[] = files
      .filter((f) => f.type.startsWith("audio/"))
      .map((f) => ({ name: f.name.replace(/\.[^.]+$/, ""), url: URL.createObjectURL(f) }));
    setTracks((prev) => [...prev, ...newTracks]);
    // Auto-play first uploaded track if nothing is playing
    if (newTracks.length > 0 && !currentTrack) {
      loadTrack(newTracks[0]);
    }
  }

  function loadTrack(track: AudioTrack) {
    setCurrentTrack(track);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function togglePlay() {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((p) => !p);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-5">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 absolute" />
      <h2 className="font-marker text-3xl text-[var(--moss-deep)]">♪ sound archive</h2>
      <p className="mt-1 font-hand text-sm text-[var(--ink)]">upload field recordings, tapes, collages — play them right here.</p>

      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Upload button */}
      <div className="mt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-full border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] px-5 py-2 font-pixel text-sm text-[var(--moss-deep)] hover:bg-[var(--moss)] hover:text-[var(--cream)] transition-colors"
        >
          ↑ upload audio files
        </button>
      </div>

      {/* Player bar (visible when a track is loaded) */}
      {currentTrack && (
        <div className="mt-4 stripes-moss rounded-xl border-2 border-[var(--moss-deep)] px-5 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[var(--cream)]">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--cream)] bg-[var(--cream)]/20 hover:bg-[var(--cream)]/40 transition-colors font-pixel text-lg"
              >
                {isPlaying ? "❚❚" : "▶"}
              </button>
              <p className="font-marker text-xl truncate max-w-[200px]">♪ {currentTrack.name}</p>
            </div>
            <div className="flex items-center gap-2 font-pixel text-sm w-full md:w-auto">
              <span>{formatTime(currentTime)}</span>
              <div
                className="relative block h-2 flex-1 min-w-[120px] cursor-pointer rounded-full bg-[var(--cream)]/40"
                onClick={seek}
              >
                <span
                  className="absolute left-0 top-0 h-2 rounded-full bg-[var(--honey)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tracklist */}
      {tracks.length > 0 && (
        <ul className="mt-3 divide-y-2 divide-dashed divide-[var(--moss)]/40">
          {tracks.map((track, i) => (
            <li key={i}>
              <button
                onClick={() => loadTrack(track)}
                className={`flex w-full items-center gap-3 py-2 px-1 font-hand text-sm rounded transition-colors hover:bg-[var(--moss-soft)] ${
                  currentTrack?.url === track.url ? "text-[var(--berry)] font-semibold" : "text-[var(--ink)]"
                }`}
              >
                <span className="font-pixel text-xs text-[var(--tomato)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate">{track.name}</span>
                {currentTrack?.url === track.url && isPlaying && (
                  <span className="ml-auto font-pixel text-xs text-[var(--moss-deep)] animate-pulse">▶ playing</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {tracks.length === 0 && (
        <p className="mt-4 font-pixel text-xs text-[var(--moss-deep)]/60">no tracks yet · upload some to begin ♪</p>
      )}
    </article>
  );
}

// ─── Comms tab ────────────────────────────────────────────────────────────────

function CommsTab() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-6">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">❀ commissions</h2>
        <p className="mt-2 font-hand text-base text-[var(--ink)]">
          currently open for small commissions! i work best on projects that feel slow and tender.
        </p>
        <ul className="mt-4 space-y-2 font-hand text-sm">
          <Bullet emoji="🌿">zine illustration (1–3 color riso)</Bullet>
          <Bullet emoji="📼">sound collage / ambient pieces</Bullet>
          <Bullet emoji="🕸">hand-coded little web pages</Bullet>
          <Bullet emoji="🧸">stop-motion concepts & storyboards</Bullet>
        </ul>
        <div className="mt-4 rounded-lg border-2 border-dashed border-[var(--tomato)] bg-[var(--tomato-soft)] p-3">
          <p className="font-pixel text-xs uppercase text-[var(--berry)]">rates</p>
          <p className="font-hand text-sm text-[var(--ink)]">starting at $40 · sliding scale available · always ask ✉</p>
        </div>
      </article>
      <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--moss-soft)] p-6">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">process notes</h2>
        <p className="mt-2 font-hand text-sm text-[var(--ink)]">
          every project starts with a long email and ends with something small and real.
          turnaround is usually 2–4 weeks depending on scope.
        </p>
        <ol className="mt-4 space-y-2 font-hand text-sm list-decimal list-inside text-[var(--ink)]">
          <li>send me a little note about what you're imagining</li>
          <li>we have a slow back-and-forth to find the shape of it</li>
          <li>i send sketches / rough drafts for feedback</li>
          <li>final files delivered with a handwritten note (digital or mail)</li>
        </ol>
      </article>
    </section>
  );
}

// ─── Contact tab ──────────────────────────────────────────────────────────────

function ContactTab() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.msg) return;
    // In a real app you'd POST to an API here.
    setSent(true);
  }

  return (
    <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-6">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">✉ say hello</h2>
        <p className="mt-1 font-hand text-sm text-[var(--ink)]">i read every message, slowly and with tea.</p>

        {sent ? (
          <div className="mt-6 rounded-xl border-2 border-dashed border-[var(--moss-deep)] bg-[var(--moss-soft)] p-6 text-center">
            <p className="font-marker text-3xl text-[var(--moss-deep)]">✿ sent with love ✿</p>
            <p className="mt-2 font-hand text-sm text-[var(--ink)]">i'll write back soon!</p>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
            <input
              placeholder="your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-3 py-2 font-hand placeholder:text-[var(--moss-deep)]/60"
            />
            <input
              placeholder="email (optional)"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-3 py-2 font-hand placeholder:text-[var(--moss-deep)]/60"
            />
            <textarea
              placeholder="your message…"
              rows={4}
              value={form.msg}
              onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
              className="w-full rounded-md border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] px-3 py-2 font-hand placeholder:text-[var(--moss-deep)]/60"
            />
            <button
              type="submit"
              className="rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] px-5 py-2 font-marker text-xl text-[var(--cream)] hover:bg-[var(--berry)] transition-colors"
            >
              send with love ♡
            </button>
          </form>
        )}
      </article>

      <article className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] p-6">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">find me</h2>
        <ul className="mt-3 space-y-2">
          {[
            { label: "tumblr garden", icon: "🌷", href: "#" },
            { label: "instagram (art)", icon: "🍓", href: "#" },
            { label: "are.na pile", icon: "🍂", href: "#" },
            { label: "bandcamp tapes", icon: "🍄", href: "#" },
          ].map((l) => (
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
    </section>
  );
}

// ─── Shrine tab ───────────────────────────────────────────────────────────────

function ShrineTab() {
  const items = [
    { emoji: "☕", label: "Coffee", note: "i am so craving cold ube latte" },
    { emoji: "⛰️", label: "Travelling", note: "in desperate need of sidequest" },
    { emoji: "💿", label: "Music", note: "obsessed with Tate Mcrae" },
    { emoji: "🎬", label: "Movies", note: "Binge-ing Off Canpus rn" },
    { emoji: "🐇", label: "Kuromi", note: "alt bunny" },
    { emoji: "📷S", label: "Camera", note: "i hav nikon Nikon D3300 and Nikon Coolpix s6300 " },
  ];

  return (
    <section className="grid gap-6">
      <header className="text-center">
        <h2 className="font-marker text-4xl text-[var(--moss-deep)]">♡ things i love ♡</h2>
        <p className="mt-1 font-hand text-base text-[var(--ink)]">a shrine to small soft beautiful things.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="relative rounded-xl border-2 border-dashed border-[var(--moss-deep)] bg-[var(--cream)] p-4 text-center hover:bg-[var(--honey)] transition-colors">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-1 absolute" />
            <div className="text-4xl mb-2">{item.emoji}</div>
            <h3 className="font-marker text-xl text-[var(--berry)]">{item.label}</h3>
            <p className="font-hand text-xs text-[var(--ink)] mt-1">{item.note}</p>
          </div>
        ))}
      </div>
      <GalleryStrip />
    </section>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function AboutCard() {
  return (
    <article className="relative rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-5">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 absolute" />
      <header className="mb-3 flex items-baseline justify-between border-b-2 border-dashed border-[var(--moss-deep)] pb-2">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">About me 🍄</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">v.07</span>
      </header>
      <p className="font-hand text-base leading-relaxed text-[var(--ink)]">S
        hi! i'm <strong>Riri</strong>, a Third-year multimedia arts student at <u className="decoration-dotted">National University - Manila</u>.
        Rooted in shoujo-inspired aesthetics, My work drifts through soft, glowing, and slightly distorted spaces—where beauty and discomfort exist side by side. Each piece feels like a fragile, altered memory, balancing intimacy with something quietly unsettling.

        <Bullet emoji="🌿">Photographer</Bullet>
        <Bullet emoji="📼">Creative Director</Bullet>
        <Bullet emoji="📖">illustrator</Bullet>
        <Bullet emoji="🕸"> Aspiring Game Developer</Bullet>
      </p>
      <div className="mt-4 rounded-lg border-2 border-dashed border-[var(--tomato)] bg-[var(--tomato-soft)] p-3">
        <p className="font-pixel text-xs uppercase text-[var(--berry)]">currently</p>
        <p className="font-hand text-sm text-[var(--ink)]">ARtifacts · creating a 3D museum app · learning cybersecurity </p>
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
        <img src={tanghals11} alt="two creatures with mushroom umbrellas" width={768} height={768} className="aspect-square w-full object-cover" loading="lazy" />
      </div>
      <p className="mt-3 text-center font-marker text-2xl text-[var(--moss-deep)]">·· Tanghalang Nasyunal ··</p>
      <p className="text-center font-hand text-sm text-[var(--ink)]">May 27 · Season 1</p>
      <span className="tape -top-3 left-4 rotate-6 absolute" />
      <span className="tape -top-3 right-4 -rotate-6 absolute" />
    </div>
  );
}

function LinksCard() {
  const links = [
    { label: "instagram (art)", icon: "🍓", href: "https://www.instagram.com/vaniillaberrii/" },
    { label: "GitHub", icon: "🍂", href: "https://github.com/Riripia" },
    { label: "bandcamp tapes", icon: "🍄", href: "#" },
    { label: "email me ✉", icon: "🌼", href: "Cauriepiamonte@gmail.com" },
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
  const audioUrl = missPossessive;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="stripes-moss rounded-xl border-2 border-[var(--moss-deep)] px-5 py-3">
      <audio ref={audioRef} src={audioUrl} />
      <div className="flex flex-wrap items-center justify-between gap-3 text-[var(--cream)]">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--cream)] bg-[var(--cream)]/20 hover:bg-[var(--cream)]/40 transition-colors font-pixel text-lg"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <p className="font-marker text-2xl">♪ Miss Possesive by Tate Mc Rae</p>
        </div>
        <div className="flex items-center gap-2 font-pixel text-sm w-full md:w-auto">
          <span>{formatTime(currentTime)}</span>
          <div
            className="relative block h-2 flex-1 min-w-[120px] cursor-pointer rounded-full bg-[var(--cream)]/40"
            onClick={seek}
          >
            <span
              className="absolute left-0 top-0 h-2 rounded-full bg-[var(--honey)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

function CottageCard() {
  return (
    <article className="relative overflow-hidden rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-3">
      <div className="overflow-hidden rounded-lg border-2 border-[var(--moss-deep)]">
        <img src={petra} alt="Petra" width={768} height={768} className="aspect-square w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-3 px-1">
        <h3 className="font-marker text-3xl text-[var(--moss-deep)]">Photography Projects 🏠</h3>
        <p className="font-hand text-base text-[var(--ink)]">
          a <em>Petra F. Collins</em> inspired photographs and editing.
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
  const items = [beach, Up, zine, tanghals11, Bea];
  return (
    <Carousel className="rounded-xl border-2 border-[var(--moss-deep)] bg-[var(--cream-deep)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-marker text-3xl text-[var(--moss-deep)]">·· the polaroid wall ··</h2>
        <span className="font-pixel text-xs text-[var(--tomato)]">use arrows</span>
      </div>
      <CarouselContent>
        {items.map((src, i) => (
          <CarouselItem key={i} className="basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center">
            <figure className={`relative rounded-lg border-2 border-[var(--moss-deep)] bg-[var(--cream)] p-2 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
              <img src={src} alt="" width={180} height={180} className="h-44 w-44 rounded-md object-cover" loading="lazy" />
              <figcaption className="mt-2 text-center font-hand text-sm text-[var(--ink)]">no. 0{i + 1}</figcaption>
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 absolute" />
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border-2 border-[var(--moss-deep)] bg-[var(--cream)] text-[var(--moss-deep)] hover:bg-[var(--moss-soft)]" />
      <CarouselNext className="border-2 border-[var(--moss-deep)] bg-[var(--cream)] text-[var(--moss-deep)] hover:bg-[var(--moss-soft)]" />
    </Carousel>
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
          <button className="rounded-full border-2 border-[var(--moss-deep)] bg-[var(--tomato)] px-5 py-2 font-marker text-xl text-[var(--cream)] hover:bg-[var(--berry)] transition-colors">
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
      <p>© 2026 Caurie M. Piamonte · handcoded with care 🍵</p>
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
