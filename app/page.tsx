import Image from "next/image";
import { Nav } from "@/components/Nav";
import { HeroDemo } from "@/components/HeroDemo";
import { DoneDemo } from "@/components/DoneDemo";
import { PixiePicker } from "@/components/PixiePicker";
import { MotionToggle } from "@/components/MotionToggle";
import { Sprite } from "@/components/Sprite";
import { DemoVideo } from "@/components/DemoVideo";
import {
  DOWNLOAD_URL,
  LICENSE_URL,
  REPO_URL,
  REQUIREMENTS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/icon-1024.png`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS",
  softwareRequirements: REQUIREMENTS,
  downloadUrl: DOWNLOAD_URL,
  license: LICENSE_URL,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const BENEFITS = [
  { icon: "◉", title: "Talk, don't type", body: "Press ⌃⌥Space and just say it." },
  { icon: "⇢", title: "Hand off real work", body: "Claude Code or Codex does it for you." },
  { icon: "✦", title: "Hear when it's done", body: "One sentence. No terminal-watching." },
  { icon: "▣", title: "Keys stay on your Mac", body: "Keychain storage. No telemetry." },
];

function Check() {
  return (
    <svg className="pv-check" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Feature({
  n,
  title,
  body,
  reverse,
  id,
  children,
}: {
  n: number;
  title: string;
  body: string;
  reverse?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className={`feat ${reverse ? "feat-rev" : ""}`}>
      <div className="feat-copy">
        <span className="feat-n">{String(n).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="feat-card">{children}</div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <section id="top" className="hero-wrap">
        <div className="sky" aria-hidden />
        <div className="page">
          <Nav />

          <main id="main" className="hero">
            <div className="compat anim">
              <span className="compat-pill">
                Works with Claude Code &amp; Codex <span className="compat-soon">More agents coming</span>
              </span>
            </div>

            <p className="eyebrow anim" style={{ "--d": ".05s" } as React.CSSProperties}>
              A desktop voice pixie for your coding agents
            </p>
            <h1 className="headline">
              <span>Say it out loud.</span>
              <span>Pixie handles the rest.</span>
            </h1>
            <p className="subhead anim" style={{ "--d": ".4s" } as React.CSSProperties}>
              DeskPixie lives on your Mac desktop. Talk to it, and it hands real work to a Claude Code
              or Codex agent in the background, keeps an eye on the sessions you started, and tells you
              when they’re done.
            </p>

            <div className="hero-actions anim" style={{ "--d": ".55s" } as React.CSSProperties}>
              <a href={DOWNLOAD_URL} className="primary-cta">
                Download for Mac <span aria-hidden>↗</span>
              </a>
              <p className="trial-note">
                Free · {REQUIREMENTS} · Bring your own OpenAI or Gemini key
              </p>
              <a href="#demo" className="demo-link">
                <span aria-hidden>▶</span> Watch the demo <span className="demo-len">1:23</span>
              </a>
            </div>

            <div className="anim" style={{ "--d": ".7s" } as React.CSSProperties}>
              <HeroDemo />
            </div>
          </main>

          <footer className="hero-foot">
            <ul className="benefits">
              {BENEFITS.map((b, i) => (
                <li
                  key={b.title}
                  className="benefit anim"
                  style={{ "--d": `${0.8 + i * 0.08}s` } as React.CSSProperties}
                >
                  <span className="benefit-icon" aria-hidden>
                    {b.icon}
                  </span>
                  <strong>{b.title}</strong>
                  <span>{b.body}</span>
                </li>
              ))}
            </ul>
            <div className="footer-meta">
              <span className="footer-brand">
                deskpixie <span className="footer-platform">{REQUIREMENTS}</span>
              </span>
              <a href="#features" className="scroll-cue">
                Meet your pixie ↓
              </a>
              <MotionToggle />
            </div>
          </footer>
        </div>
      </section>

      <section className="story">
        <div id="demo" className="demo">
          <h2>See it in action</h2>
          <p>
            You ask Pixie to ship a fix. It passes the word to your Claude Code session, waits for
            the deploy, and tells you out loud when the site is live.
          </p>
          <DemoVideo />
        </div>

        <div id="features" className="feat-intro">
          <h2>Your agents are busy. Pixie keeps watch.</h2>
          <p>
            Pixie turns long agent runs into short spoken updates, and turns what you say into work
            for them. You stay in the loop without staring at a terminal.
          </p>
          <p className="compat-note">
            <b>Claude Code</b> · <b>Codex</b> · any terminal: WebStorm, iTerm, VS Code
          </p>
          <p className="roadmap-note">
            <span className="soon-tag">Coming soon</span> Support for more coding agents, and for
            platforms beyond macOS.
          </p>
        </div>

        <div className="feat-list">
          <Feature
            n={1}
            title="Talk to it like a teammate"
            body="Press ⌃⌥Space or double-click Pixie and just talk. Answers come back short and spoken, and Pixie’s mouth moves while it talks. Ask the time, set a timer, or ask what your agents are up to."
          >
            <div className="feat-panel talk">
              <div className="keys" aria-label="Control, Option, Space">
                <kbd>⌃</kbd>
                <kbd>⌥</kbd>
                <kbd className="wide">Space</kbd>
              </div>
              <Sprite pixie="bit" state="listening" scale={6} />
              <div className="wave" aria-hidden>
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <p className="talk-line">“Remind me in twenty minutes to check the deploy.”</p>
            </div>
          </Feature>

          <Feature
            n={2}
            reverse
            title="Hands off the real work"
            body="Coding, research and repo chores go to the coordinator: a Claude Code agent (or OpenAI Codex, if you prefer) working in the background in a Herdr session. It can start its own workers and split the job up, while Pixie stays free to chat. Needs Herdr 0.7.5 or 0.9.x."
          >
            <div className="feat-panel flow">
              <div className="flow-node">
                <Sprite pixie="bit" state="delegating" scale={2} />
                <div>
                  <b>Pixie</b>
                  <span>“Add rate limiting to the API.”</span>
                </div>
              </div>
              <div className="flow-line" />
              <div className="flow-node">
                <span className="flow-icon">⚙</span>
                <div>
                  <b>Coordinator</b>
                  <span>Claude Code or Codex · plans and delegates</span>
                </div>
              </div>
              <div className="flow-line" />
              <div className="flow-workers">
                {[
                  ["Worker 1", "middleware", "done"],
                  ["Worker 2", "tests", "running"],
                  ["Worker 3", "docs", "queued"],
                ].map(([name, task, status]) => (
                  <div key={name} className={`worker worker-${status}`}>
                    <b>{name}</b>
                    <span>{task}</span>
                    <em>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          </Feature>

          <Feature
            n={3}
            title="Tells you when it’s done"
            body="When a long turn in one of your sessions ends, Pixie says what happened in one sentence. Each session names itself after its project and task, so you can say “tell the login-bug one to stop.”"
          >
            <DoneDemo />
          </Feature>

          <Feature
            n={4}
            reverse
            title="Reaches the sessions you already run"
            body="Start Claude Code or Codex with pix in any terminal: WebStorm, iTerm, VS Code. The agent looks and works exactly as usual. The difference is that Pixie can now see that session, message it, and interrupt it, right next to its own workers. Install pix from Settings ▸ Coordinator ▸ pix command."
          >
            <div className="feat-panel term">
              <div className="term-win">
                <div className="term-bar">
                  <i />
                  <i />
                  <i />
                  <span>api: add rate limiting</span>
                </div>
                <pre>
                  <span className="t-dim">~/code/api</span> <span className="t-g">$</span> pix claude
                  {"\n"}
                  <span className="t-dim">✻ Claude Code</span>
                  {"\n"}
                  {"\n"}
                  <span className="t-p">● pixie</span> Ship it with a 100/min default.
                  {"\n"}
                  <span className="t-dim">  ⎿ queued to Claude’s inbox</span>
                </pre>
              </div>
              <div className="roster">
                <div className="roster-head">
                  <Sprite pixie="bit" scale={1} /> ⚙ 3 · ⌨ 2
                </div>
                <div className="roster-row">
                  <span className="dot" /> api: add rate limiting
                </div>
                <div className="roster-row">
                  <span className="dot dot-idle" /> docs: rewrite setup guide
                </div>
              </div>
              <p className="term-note">Quitting DeskPixie never ends a session you started.</p>
            </div>
          </Feature>

          <Feature
            n={5}
            id="privacy"
            title="Keeps your keys on your Mac"
            body="Your API keys live in the macOS Keychain and are never logged. The microphone is only on while a conversation is open. Agent work runs through your own Claude Code and Codex, and pix never edits your config files."
          >
            <div className="feat-panel privacy">
              <div className="pv-mac">
                <div className="pv-head">
                  <svg viewBox="0 0 20 16" aria-hidden>
                    <rect x="1" y="1" width="18" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M6 15h8" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <b>Your Mac</b>
                  <span className="pv-on">
                    <i /> On device
                  </span>
                </div>
                <ul>
                  <li>
                    API keys, in Keychain <Check />
                  </li>
                  <li>
                    Agent sessions &amp; source code <Check />
                  </li>
                  <li>
                    Your Claude &amp; Codex settings, untouched <Check />
                  </li>
                </ul>
              </div>
              <div className="pv-link">
                <span className="pv-line" />
                <span className="pv-label">
                  Only your voice, only while you’re talking, to the provider you pick
                </span>
                <span className="pv-line" />
              </div>
              <span className="pv-cloud">OpenAI Realtime or Gemini Live</span>
              <p className="pv-foot">No telemetry. No analytics. Uninstalling leaves nothing behind.</p>
            </div>
          </Feature>
        </div>

        <div id="pixies" className="pixies">
          <h2>Pick your pixie</h2>
          <p>
            Four hand-drawn characters, each with its own moods for listening, thinking, handing off
            work and celebrating.
          </p>
          <PixiePicker />
        </div>

        <div className="closing">
          <Image src="/icon-1024.png" alt="" width={96} height={96} className="closing-icon" />
          <h2>Less terminal-watching. More getting on with it.</h2>
          <p>Talk to your coding agents and hear back from them. Free on macOS.</p>
          <a href={DOWNLOAD_URL} className="primary-cta dark">
            Download for Mac <span aria-hidden>↗</span>
          </a>
          <p className="trial-note">
            Free · {REQUIREMENTS} · Signed and notarized
          </p>
          <p className="trial-note">More coding agents and other platforms are on the way.</p>
        </div>

        <footer className="site-footer">
          <div className="sf-brand">
            <Image src="/icon-1024.png" alt="" width={28} height={28} />
            <div>
              <b>DeskPixie</b>
              <span>A desktop voice pixie for every coding agent.</span>
            </div>
          </div>
          <nav className="sf-links" aria-label="Footer">
            <a href="#features">Features</a>
            <a href="#pixies">Pixies</a>
            <a href="#privacy">Privacy</a>
            <a href={REPO_URL}>GitHub</a>
            <a href={DOWNLOAD_URL}>Download</a>
          </nav>
          <p className="sf-copy">© 2026 DeskPixie</p>
        </footer>
      </section>
    </>
  );
}
