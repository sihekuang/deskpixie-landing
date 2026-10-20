"use client";

import { useEffect, useState } from "react";
import { Sprite } from "./Sprite";
import type { PixieState } from "@/lib/site";

type Beat = { state: PixieState; ms: number; you?: string; pixie?: string };

const SCRIPT: Beat[] = [
  { state: "idle", ms: 1800 },
  { state: "listening", ms: 2800, you: "Is the login-bug one done yet?" },
  { state: "thinking", ms: 1400, you: "Is the login-bug one done yet?" },
  { state: "delegating", ms: 2200, pixie: "Checking with it now…" },
  { state: "happy", ms: 4200, pixie: "Done. The redirect loop is fixed and all 42 tests pass." },
];

export function HeroDemo() {
  const [i, setI] = useState(0);
  const beat = SCRIPT[i];

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % SCRIPT.length), beat.ms);
    return () => clearTimeout(t);
  }, [i, beat.ms]);

  const line = beat.pixie ?? beat.you;

  return (
    <div className="hero-demo" aria-live="polite">
      <div className={`bubble ${line ? "is-on" : ""} ${beat.pixie ? "bubble-pixie" : "bubble-you"}`}>
        {line && (
          <>
            <span className="bubble-who">{beat.pixie ? "Pixie" : "You"}</span>
            <span key={line}>{line}</span>
          </>
        )}
      </div>
      <Sprite pixie="bit" state={beat.state} talking={Boolean(beat.pixie)} />
      <div className="roster-chip" aria-label="3 coordinator workers, 2 of your sessions">
        <span className="dot" />
        <span className="glyph">⚙</span> 3 · <span className="glyph">⌨</span> 2
      </div>
    </div>
  );
}
