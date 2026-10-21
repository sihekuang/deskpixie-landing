"use client";

import { useEffect, useState } from "react";
import { Sprite } from "./Sprite";
import type { PixieState } from "@/lib/site";

type Mode = "voice" | "text";

// card: what the message card under the row shows. "caption" is voice mode's captions
// (Pixie's words only); the others are text mode's phases, as in the app.
type Card = "caption" | "ready" | "typing" | "thinking" | "answering" | "done";

type Beat = {
  state: PixieState;
  ms: number;
  mode: Mode;
  you?: string;
  pixie?: string;
  card?: Card;
};

const TYPED = "Is the login-bug one done yet?";
const ANSWER = "Yes. The redirect loop is fixed and all 42 tests pass.";

const SCRIPT: Beat[] = [
  { mode: "voice", state: "idle", ms: 1600 },
  { mode: "voice", state: "listening", ms: 2600, you: TYPED },
  { mode: "voice", state: "thinking", ms: 1200, you: TYPED },
  { mode: "voice", state: "delegating", ms: 2000, pixie: "Checking with it now…", card: "caption" },
  { mode: "voice", state: "happy", ms: 3800, pixie: ANSWER, card: "caption" },
  // Somewhere quiet: flip to 💬 and type instead. No sound, so no moving mouth.
  { mode: "text", state: "idle", ms: 1100, card: "ready" },
  { mode: "text", state: "idle", ms: 2200, card: "typing" },
  { mode: "text", state: "thinking", ms: 1600, card: "thinking" },
  { mode: "text", state: "delegating", ms: 2400, card: "answering" },
  { mode: "text", state: "happy", ms: 3600, card: "done" },
];

const TICK = 50;

export function HeroDemo() {
  const [i, setI] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const beat = SCRIPT[i];

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => setElapsed(Date.now() - start), TICK);
    const next = setTimeout(() => {
      setElapsed(0);
      setI((n) => (n + 1) % SCRIPT.length);
    }, beat.ms);
    return () => {
      clearInterval(tick);
      clearTimeout(next);
    };
  }, [i, beat.ms]);

  // Typing runs over the first 85% of its beat, so the full text sits for a moment.
  const progress = Math.min(1, elapsed / (beat.ms * 0.85));
  const typedChars = (text: string) => text.slice(0, Math.round(text.length * progress));
  const typedWords = (text: string) => {
    const words = text.split(" ");
    return words.slice(0, Math.max(1, Math.round(words.length * progress))).join(" ");
  };

  const bubble = beat.you;
  const card = beat.card;
  const busy = card === "thinking" || card === "answering";

  let answer = "";
  if (card === "caption") answer = beat.pixie ?? "";
  if (card === "answering") answer = typedWords(ANSWER);
  if (card === "done") answer = ANSWER;

  let input = "";
  if (card === "typing") input = typedChars(TYPED);

  return (
    <div className="hero-demo" aria-live="polite">
      {/* Fixed-height slot: the bubble grows upward, so lines of different length never move Pixie. */}
      <div className="bubble-slot">
        <div className={`bubble bubble-you ${bubble ? "is-on" : ""}`}>
          {bubble && (
            <>
              <span className="bubble-who">You</span>
              <span>{bubble}</span>
            </>
          )}
        </div>
      </div>
      <Sprite pixie="bit" state={beat.state} talking={beat.mode === "voice" && Boolean(beat.pixie)} />
      <div className="mac-ui">
        <div className="roster-row">
          <div className="roster-chip mac-material" aria-label="3 of Pixie's agents, 2 of your sessions">
            <span className="dot" />
            <span className="count">
              <GearIcon /> 3
            </span>
            <span className="count">
              <KeyboardIcon /> 2
            </span>
          </div>
          <div className="mode-toggle mac-material" role="group" aria-label="Reply mode">
            <span className={beat.mode === "voice" ? "is-on" : ""} aria-label="Voice">
              <SpeakerIcon />
            </span>
            <span className={beat.mode === "text" ? "is-on" : ""} aria-label="Text">
              <ChatIcon />
            </span>
          </div>
        </div>

        {/* Same trick below the row: a fixed slot, so the card opening never moves anything. */}
        <div className="card-slot">
          <div className={`chat-card mac-material ${card ? "is-on" : ""}`}>
            {(answer || busy) && <span className="chat-who">Pixie</span>}
            {answer && <p className="chat-answer">{answer}</p>}
            {busy && (
              <div className="chat-status">
                <span>{card === "thinking" ? "Thinking…" : "Answering…"}</span>
                <span className="chat-stop">
                  <i aria-hidden /> Stop
                </span>
              </div>
            )}
            {card !== "caption" && (
              <div className="chat-input">
                <span className={input ? "" : "chat-placeholder"}>
                  {input || "Message Pixie"}
                  {(card === "ready" || card === "typing") && <i className="caret" />}
                </span>
                <SendIcon on={card === "typing" && input.length > 0} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Drawn after the SF Symbols the app uses: gearshape.fill, keyboard, speaker.wave.2.fill,
// bubble.left.fill and arrow.up.circle.fill.
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.3 2h3.4l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.7 2.9-2 1.8c.1.6.1 1.3 0 1.9l2 1.8-1.7 2.9-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-3.4l-.5-2.6c-.6-.2-1.2-.5-1.7-.9l-2.5.9-1.7-2.9 2-1.8a6 6 0 0 1 0-1.9l-2-1.8 1.7-2.9 2.5.9c.5-.4 1.1-.7 1.7-.9zM12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z"
        transform="translate(0 1.5)"
      />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="6" width="20" height="13" rx="2.5" />
      <path d="M6 10h.01M9.3 10h.01M12.6 10h.01M15.9 10h.01M19 10h.01M6 13h.01M19 13h.01M8.5 16h7" strokeLinecap="round" strokeWidth="2" />
      <path d="M9.3 13h5.4" strokeLinecap="round" strokeWidth="2" strokeDasharray=".01 3.3" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 20 16" width="1em" height="1em" aria-hidden>
      <path d="M2 5.5h3l4-3.5v12L5 10.5H2z" fill="currentColor" />
      <path
        d="M12 5c1 .8 1.5 1.8 1.5 3s-.5 2.2-1.5 3M14.5 2.8c1.6 1.4 2.5 3.2 2.5 5.2s-.9 3.8-2.5 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 18 16" width="1em" height="1em" aria-hidden>
      <path
        d="M9 1C4.6 1 1 3.8 1 7.2c0 1.9 1.1 3.6 2.9 4.7L3.2 15l3.6-2.1c.7.2 1.4.3 2.2.3 4.4 0 8-2.8 8-6.1S13.4 1 9 1z"
        fill="currentColor"
      />
    </svg>
  );
}

function SendIcon({ on }: { on: boolean }) {
  return (
    <svg className={`chat-send ${on ? "is-on" : ""}`} viewBox="0 0 20 20" aria-hidden>
      <mask id="send-arrow">
        <rect width="20" height="20" fill="#fff" />
        <path d="M10 14.6V5.6M6 9.4l4-4 4 4" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </mask>
      <circle cx="10" cy="10" r="10" fill="currentColor" mask="url(#send-arrow)" />
    </svg>
  );
}
