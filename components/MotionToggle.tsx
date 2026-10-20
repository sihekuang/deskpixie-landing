"use client";

import { useEffect, useState } from "react";

export function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
  }, [paused]);

  return (
    <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
      <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
      <span className="motion-label">{paused ? "Play motion" : "Pause motion"}</span>
    </button>
  );
}
