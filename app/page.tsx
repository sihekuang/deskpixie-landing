import Image from "next/image";
import { Nav } from "@/components/Nav";
import { HeroDemo } from "@/components/HeroDemo";
import { DoneDemo } from "@/components/DoneDemo";
import { PixiePicker } from "@/components/PixiePicker";
import { MotionToggle } from "@/components/MotionToggle";
import { Sprite } from "@/components/Sprite";
import { DemoVideo } from "@/components/DemoVideo";
import { PaperclipIcon, SendIcon } from "@/components/HeroDemo";
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
  { icon: "◉", title: "Talk or type", body: "Press ⌃⌥Space and say it, or type it." },
  { icon: "⇢", title: "Hand off real work", body: "Claude Code or Codex does it for you." },
  { icon: "✦", title: "Hear when it's done", body: "One sentence. No terminal-watching." },
  { icon: "▣", title: "Keys stay on your computer", body: "Keychain storage. No telemetry." },
];

// Privacy panel: 32 half-hour cells, lit only for one conversation with Pixie.
const SHEET_ROWS = ["idle", "listening", "thinking", "delegating", "happy", "error", "mouths"];
const PIXIE_GUIDE_URL = `${REPO_URL}/blob/main/docs/making-a-pixie.md`;

const MIC_CELLS = 32;
const MIC_ON = [19, 20, 21];
const CANVAS_BARS: [string, number, number][] = [
  ["/", 92, 48],
  ["/docs", 70, 41],
  ["/pricing", 55, 30],
];

const HOME_TILES = [
  ["KEY", "API keys, in Keychain, never logged"],
  ["SRC", "Agent sessions and source code"],
  ["CFG", "Claude and Codex settings, untouched"],
];

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
                Keep Claude Code or Codex. No switching. <span className="compat-soon">More agents coming</span>
              </span>
            </div>

            <p className="eyebrow tagline anim" style={{ "--d": ".05s" } as React.CSSProperties}>
              One pixie to rule them all.
            </p>
            <h1 className="headline">
              <span>Say it out loud.</span>
              <span>Pixie handles the rest.</span>
            </h1>
            <p className="subhead anim" style={{ "--d": ".4s" } as React.CSSProperties}>
              DeskPixie lives inside your desktop. Talk to it, and it hands real work to a Claude Code
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

        <div className="workflow">
          <h2>Your workflow, now with a voice.</h2>
          <p>
            DeskPixie isn’t another coding agent to switch to. It’s one layer across the agents you
            already use, Claude Code and Codex today with more to come. Keep your terminal, your editor
            and your vendor. Pixie adds a voice on top and meets you right where you’re working.
          </p>
          <ul className="stack" aria-label="Your terminal, your editor and your agents, plus a voice">
            <li>Your terminal</li>
            <li className="plus" aria-hidden>
              +
            </li>
            <li>Your editor</li>
            <li className="plus" aria-hidden>
              +
            </li>
            <li>Your agents</li>
            <li className="plus" aria-hidden>
              +
            </li>
            <li className="voice">
              <Sprite pixie="bit" scale={1} /> a voice
            </li>
          </ul>
        </div>

        <div id="features" className="feat-intro">
          <h2>Your agents are busy. Pixie keeps watch.</h2>
          <p>
            Pixie turns long agent runs into short spoken updates, and turns what you say into work
            for them. Your hands come off the keyboard, and you know how every session is doing
            without checking on it.
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
            title="Talk to it, or type"
            body="Press ⌃⌥Space or double-click Pixie and just talk, hands off the keyboard. Answers come back short and spoken, and Pixie does quick things itself: the time, the weather, a timer, a sum, some music. Your words and Pixie’s show as captions while you talk, and ‹ › steps back through the last few minutes of replies. In a meeting? Flip the toggle under Pixie to 💬 and type instead: the answer shows as text, without a sound."
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
            body="Coding, research and repo chores go to the coordinator: a Claude Code agent (or OpenAI Codex, if you prefer) working in the background in a Herdr session. It can start its own workers and split the job up, while Pixie stays free to chat. Results, questions and permission requests come back to you, and a worker that made something stays open until you’re done with it. Needs Herdr 0.7.5 or 0.9.x."
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
            title="Hand it what you’re looking at"
            body="Copy a screenshot of an error, a PDF or a log file, and Pixie offers to take it. Paste it into the text box, drop it on Pixie, pick it with 📎, or just say “take what I copied.” The coordinator, and any worker it hands the job to, gets the file with your request."
          >
            <div className="feat-panel attach mac-ui">
              <span className="offer mac-material">
                <PhotoIcon /> Want me to take this?
              </span>
              <Sprite pixie="bit" state="listening" scale={3} />
              <div className="chat-card mac-material is-on">
                <div className="chips">
                  <span className="chip">
                    <i className="thumb" /> Screenshot 10.22 at 09.41.png <b aria-hidden>✕</b>
                  </span>
                  <span className="chip">
                    <i className="thumb doc" /> build.log <b aria-hidden>✕</b>
                  </span>
                </div>
                <div className="chat-input">
                  <PaperclipIcon />
                  <span className="chat-field">Why is the build failing?</span>
                  <SendIcon on />
                </div>
              </div>
              <p className="attach-note">Up to five files at a time. Text you copy stays text.</p>
            </div>
          </Feature>

          <Feature
            n={4}
            reverse
            title="Tells you when it’s done"
            body="No more checking back on a session, or flipping through tabs to find the one you meant. When a long turn in one of your sessions ends, Pixie says what happened in one sentence. Each session names itself after its project and task, so you can say “tell the login-bug one to stop.” A button under Pixie’s words takes you straight to that session’s terminal tab."
          >
            <DoneDemo />
          </Feature>

          <Feature
            n={5}
            title="Reaches the sessions you already run"
            body="Start Claude Code or Codex with pix in any terminal: WebStorm, iTerm, VS Code. The agent looks and works exactly as usual. The difference is that Pixie can now see that session, message it, interrupt it and pass on its questions, right next to its own workers. Say “show me the api session” and its tab comes to the front. Install pix from Settings ▸ Coordinator ▸ pix command."
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
            n={6}
            reverse
            title="Shows, not just tells"
            body="Some answers are better seen. The coordinator can open a canvas page next to Pixie: a chart, an architecture diagram, a side-by-side comparison. Ask it to show you, and the page opens on your desktop."
          >
            <div className="feat-panel canvas">
              <div className="canvas-win">
                <div className="term-bar">
                  <i />
                  <i />
                  <i />
                  <span>Bundle size by route</span>
                </div>
                <div className="canvas-page">
                  <b>Bundle size by route</b>
                  <span className="canvas-sub">Before and after the split, in kB</span>
                  <div className="bars" role="img" aria-label="Bar chart: every route got smaller after the split">
                    {CANVAS_BARS.map(([route, before, after]) => (
                      <div key={route} className="bar-row">
                        <span>{route}</span>
                        <div>
                          <i className="b1" style={{ width: `${before}%` }} />
                          <i className="b2" style={{ width: `${after}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="canvas-legend">
                    <span>
                      <i className="b1" /> before
                    </span>
                    <span>
                      <i className="b2" /> after
                    </span>
                  </div>
                </div>
              </div>
              <div className="canvas-pixie">
                <Sprite pixie="bit" state="happy" scale={2} />
                <span>“Here’s the comparison.”</span>
              </div>
            </div>
          </Feature>

          <Feature
            n={7}
            id="privacy"
            title="Keeps your keys on your computer"
            body="Your API keys live in the system Keychain and are never logged. The microphone is only on while a conversation is open. Agent work runs through your own Claude Code and Codex, and pix never edits your config files."
          >
            <div className="feat-panel privacy">
              <p className="mic-title">Your mic, across a day</p>
              {/* One cell per half hour; only the stretch where you talk to Pixie is lit. */}
              <div className="mic-track" aria-label="Microphone off all day except while you talk to Pixie">
                <div className="mic-pixie" style={{ gridColumn: `${MIC_ON[0] + 1} / span ${MIC_ON.length}` }}>
                  <span className="mic-bubble">voice → your provider</span>
                  <Sprite pixie="bit" state="listening" scale={2} />
                </div>
                {Array.from({ length: MIC_CELLS }, (_, i) => (
                  <i key={i} className={MIC_ON.includes(i) ? "on" : undefined} />
                ))}
              </div>
              <div className="mic-legend">
                <span>
                  <i /> mic off
                </span>
                <span>
                  <i className="on" /> talking to Pixie
                </span>
              </div>

              <p className="mic-title">Never leaves your computer</p>
              <ul className="home-tiles">
                {HOME_TILES.map(([tag, text]) => (
                  <li key={tag}>
                    <b>{tag}</b>
                    {text}
                  </li>
                ))}
              </ul>

            </div>
          </Feature>
        </div>

        <div id="setup" className="setup">
          <h2>Set up in one window</h2>
          <p>
            The first time you open DeskPixie, a welcome window walks you through it. Every choice
            is the same setting you can change later.
          </p>
          <ol className="setup-steps">
            <li>
              <b>Pick your Pixie</b>
              <span>And what it does: talk, run agents, watch your own sessions, show canvas pages.</span>
            </li>
            <li>
              <b>Set up each part</b>
              <span>Your voice key and microphone, Herdr with Claude Code or Codex, and the pix command.</span>
            </li>
            <li>
              <b>Allow permissions once</b>
              <span>Every permission up front, so nothing interrupts you later.</span>
            </li>
          </ol>
        </div>

        <div id="pixies" className="pixies">
          <h2>Pick your pixie</h2>
          <p>
            Four hand-drawn characters, each with its own moods for listening, thinking, handing off
            work and celebrating.
          </p>
          <PixiePicker />
        </div>

        <div id="make" className="make">
          <div className="make-sheet">
            {/* Dino's whole sheet: one row per animation, and a row of mouths. */}
            <Image src="/pixies/dino.png" alt="Dino's sprite sheet: one row of frames per animation" width={256} height={224} unoptimized />
            <ol className="make-rows" aria-hidden>
              {SHEET_ROWS.map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ol>
          </div>
          <div className="make-copy">
            <h2>Make your own pixie</h2>
            <p>
              A pixie is one sprite sheet and a short <code>pixie.json</code>. Draw it in any pixel
              editor; no rebuilding the app.
            </p>
            <ol className="make-steps">
              <li>
                <b>Copy a built-in pixie</b>
                <span>Dino has every animation, so it&apos;s the easiest to start from.</span>
              </li>
              <li>
                <b>Redraw its sheet</b>
                <span>One row per mood, one cell per frame, and a row of mouth shapes for talking.</span>
              </li>
              <li>
                <b>Drop it in your pixies folder</b>
                <span>Pixie ▸ Reload Pixies, then pick it in Settings. Zip the folder to share it.</span>
              </li>
            </ol>
            <a href={PIXIE_GUIDE_URL} className="make-link">
              Read the guide on GitHub <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="closing">
          <Image src="/icon-1024.png" alt="" width={96} height={96} className="closing-icon" />
          <h2>Less terminal-watching. More getting on with it.</h2>
          <p>Talk or type to your coding agents, and hear back from them. Free and open source.</p>
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
              <span>A voice layer on top of your coding agents.</span>
            </div>
          </div>
          <nav className="sf-links" aria-label="Footer">
            <a href="#features">Features</a>
            <a href="#pixies">Pixies</a>
            <a href={PIXIE_GUIDE_URL}>Make a pixie</a>
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

// photo.fill, as on the app's "Want me to take this?" bubble.
function PhotoIcon() {
  return (
    <svg className="sym" viewBox="0 0 20 16" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 1h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm11 3.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM2.5 13.2l4.6-5.4 3.4 3.8 2-2 4.9 3.6z"
      />
    </svg>
  );
}
