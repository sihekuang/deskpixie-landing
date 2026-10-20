"use client";

import { useState } from "react";
import { Sprite } from "./Sprite";
import { PIXIES, STATE_ROWS, type PixieId, type PixieState } from "@/lib/site";

const IDS = Object.keys(PIXIES) as PixieId[];
const STATES = Object.keys(STATE_ROWS) as PixieState[];

export function PixiePicker() {
  const [pixie, setPixie] = useState<PixieId>("bit");
  const [state, setState] = useState<PixieState>("idle");

  return (
    <div className="picker">
      <div className="picker-stage">
        <Sprite pixie={pixie} state={state} scale={7} />
        <p className="picker-name">{PIXIES[pixie].name}</p>
        <p className="picker-blurb">{PIXIES[pixie].blurb}</p>
      </div>

      <div className="picker-controls">
        <div className="picker-row" role="radiogroup" aria-label="Character">
          {IDS.map((id) => (
            <button
              key={id}
              role="radio"
              aria-checked={pixie === id}
              className="picker-pixie"
              onClick={() => setPixie(id)}
            >
              <Sprite pixie={id} scale={2} />
              <span>{PIXIES[id].name}</span>
            </button>
          ))}
        </div>
        <div className="segmented" role="radiogroup" aria-label="Mood">
          {STATES.map((s) => (
            <button key={s} role="radio" aria-checked={state === s} onClick={() => setState(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
