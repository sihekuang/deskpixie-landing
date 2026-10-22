"use client";

import { useEffect, useState } from "react";
import { Sprite } from "./Sprite";
import type { PixieState } from "@/lib/site";

type Mode = "voice" | "text";

// card: what the card under the row shows, as in the app. "heard" and "caption" are voice
// mode's live captions (your words, then Pixie's); the others are text mode's phases.
type Card = "heard" | "caption" | "ready" | "typing" | "thinking" | "answering" | "done";

type Beat = {
  state: PixieState;
  ms: number;
  mode: Mode;
  card?: Card;
  text?: string;
  /** Words appear one by one over the beat, as they're heard or said. */
  stream?: boolean;
  /** The other side's last words, in their own bubble above the caption until they fade. */
  earlier?: string;
  fade?: boolean;
  /** A button under the words to the session they're about. */
  session?: boolean;
  /** ‹ n/m › through Pixie's recent replies. */
  position?: string;
};

const ASKED = "Is the login-bug one done yet?";
const ANSWER = "Yes. The redirect loop is fixed and all 42 tests pass.";
const SESSION = "deskpixie: fix login redirect loop";

const SCRIPT: Beat[] = [
  { mode: "voice", state: "idle", ms: 1400 },
  { mode: "voice", state: "listening", ms: 2600, card: "heard", text: ASKED, stream: true },
  { mode: "voice", state: "thinking", ms: 1000, card: "heard", text: ASKED },
  { mode: "voice", state: "delegating", ms: 1900, card: "caption", text: "Checking with that session now…", stream: true, earlier: ASKED },
  { mode: "voice", state: "happy", ms: 4600, card: "caption", text: ANSWER, stream: true, earlier: ASKED, fade: true, session: true, position: "2/2" },
  // Somewhere quiet: flip to 💬 and type instead. No sound, so no moving mouth.
  { mode: "text", state: "idle", ms: 1100, card: "ready" },
  { mode: "text", state: "idle", ms: 2200, card: "typing", text: ASKED },
  { mode: "text", state: "thinking", ms: 1600, card: "thinking" },
  { mode: "text", state: "delegating", ms: 2400, card: "answering", text: ANSWER, stream: true },
  { mode: "text", state: "happy", ms: 3600, card: "done", text: ANSWER, session: true },
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

  // Streaming runs over the first part of its beat, so the full text sits for a moment.
  const progress = Math.min(1, elapsed / (Math.min(beat.ms * 0.85, 2400)));
  const typedChars = (text: string) => text.slice(0, Math.round(text.length * progress));
  const typedWords = (text: string) => {
    const words = text.split(" ");
    return words.slice(0, Math.max(1, Math.round(words.length * progress))).join(" ");
  };

  const card = beat.card;
  const busy = card === "thinking" || card === "answering";
  const text = beat.text ?? "";
  const shown = card === "typing" ? "" : beat.stream ? typedWords(text) : text;
  const input = card === "typing" ? typedChars(text) : "";
  const who = card === "heard" ? "You" : "Pixie";

  return (
    <div className="hero-demo" aria-live="polite">
      <Sprite pixie="bit" state={beat.state} talking={beat.mode === "voice" && card === "caption"} />
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

        {/* A fixed slot below the row, so captions and the card never move Pixie. */}
        <div className="card-slot">
          {beat.earlier && (
            <div className={`earlier mac-material ${beat.fade ? "fade" : ""}`}>
              <span className="chat-who">You</span>
              <p className="chat-answer">{beat.earlier}</p>
            </div>
          )}
          <div className={`chat-card mac-material ${card ? "is-on" : ""}`}>
            {(shown || busy) && (
              <span className="chat-who">
                {who}
                {beat.position && (
                  <span className="reply-arrows" aria-label={`Reply ${beat.position}`}>
                    <Chevron /> {beat.position} <Chevron right />
                  </span>
                )}
              </span>
            )}
            {shown && <p className="chat-answer">{shown}</p>}
            {beat.session && (
              <span className="session-btn mac-material">
                <TerminalIcon /> <span>{SESSION}</span> <span aria-hidden>↗</span>
              </span>
            )}
            {busy && (
              <div className="chat-status">
                <span>{card === "thinking" ? "Thinking…" : "Answering…"}</span>
                <span className="chat-stop">
                  <i aria-hidden /> Stop
                </span>
              </div>
            )}
            {beat.mode === "text" && (
              <div className="chat-input">
                <PaperclipIcon />
                <span className={`chat-field ${input ? "" : "chat-placeholder"}`}>
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
// bubble.left.fill, arrow.up.circle.fill, terminal, paperclip and chevrons.
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

export function SendIcon({ on }: { on: boolean }) {
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

export function TerminalIcon() {
  return (
    <svg className="sym" viewBox="0 0 20 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1" y="1" width="18" height="14" rx="3" />
      <path d="M5 5.5 8 8l-3 2.5M10 11h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PaperclipIcon() {
  return (
    <svg className="sym clip" viewBox="0 0 16 20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M11.5 6.5v7.2a3.5 3.5 0 0 1-7 0V5a2.3 2.3 0 0 1 4.6 0v8.2a1.1 1.1 0 0 1-2.2 0V6.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron({ right }: { right?: boolean }) {
  return (
    <svg className="sym" viewBox="0 0 10 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d={right ? "M3 3l5 5-5 5" : "M7 3 2 8l5 5"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
