"use client";

import { useState } from "react";

// Session names come from pix's set_description tool; each shows as the terminal tab title.
const SESSIONS = [
  {
    tab: "deskpixie: fix login redirect loop",
    said: "The login-bug session finished. The redirect loop is gone and all 42 tests pass.",
  },
  {
    tab: "api: add rate limiting",
    said: "Rate limiting is in, but it's asking whether 100 requests a minute is right.",
  },
  {
    tab: "docs: rewrite setup guide",
    said: "The setup guide is rewritten. It's waiting for you to review the diff.",
  },
];

export function DoneDemo() {
  const [active, setActive] = useState(0);

  return (
    <div className="feat-panel done-demo">
      <p className="feat-hint">Pick a finished session</p>
      <div className="tabs" role="tablist" aria-label="Terminal tabs">
        {SESSIONS.map((s, i) => (
          <button
            key={s.tab}
            role="tab"
            aria-selected={active === i}
            className="tab"
            onClick={() => setActive(i)}
          >
            <span className="tab-dot" />
            {s.tab}
          </button>
        ))}
      </div>
      <div className="said" key={active}>
        <span className="said-label">Pixie says</span>
        <p>“{SESSIONS[active].said}”</p>
      </div>
    </div>
  );
}
