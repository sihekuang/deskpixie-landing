"use client";

import { useRef, useState } from "react";

// 1728×1116 (half the Retina recording), 30 fps, H.264 + mono AAC, ~5.6 MB. Captions from the
// audio, with speakers named; see public/demo/.
const SRC = "/demo/deskpixie-demo.mp4";

export function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="demo-frame">
      <video
        ref={ref}
        className="demo-video"
        controls={started}
        preload="metadata"
        playsInline
        poster="/demo/deskpixie-demo-poster.jpg"
        width={1728}
        height={1116}
        onPlay={() => setStarted(true)}
      >
        <source src={SRC} type="video/mp4" />
        <track
          kind="captions"
          src="/demo/deskpixie-demo.vtt"
          srcLang="en"
          label="English"
          default
        />
      </video>
      {!started && (
        <button className="demo-play" onClick={() => ref.current?.play()}>
          <span className="demo-play-icon" aria-hidden>
            ▶
          </span>
          <span>
            Watch the demo <span className="demo-len">1:23 · sound on</span>
          </span>
        </button>
      )}
    </div>
  );
}
