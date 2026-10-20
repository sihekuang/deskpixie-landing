import type { CSSProperties } from "react";
import { MOUTHS, STATE_ROWS, type PixieId, type PixieState } from "@/lib/site";

type Props = {
  pixie: PixieId;
  state?: PixieState;
  /** Device pixels per sprite pixel. Omit to let CSS size it (see `.hero-demo .sprite`). */
  scale?: number;
  /** Cycle the mouth through its open levels, as the app does while Pixie speaks. */
  talking?: boolean;
  className?: string;
};

export function Sprite({ pixie, state = "idle", scale, talking, className }: Props) {
  const mouth = MOUTHS[pixie];
  const style = {
    ...(scale ? { "--w": `${32 * scale}px` } : {}),
    "--row": STATE_ROWS[state],
    backgroundImage: `url(/pixies/${pixie}.png)`,
  } as CSSProperties;
  const mouthStyle = {
    "--mrow": mouth.row,
    "--mx": mouth.anchor[0],
    "--my": mouth.anchor[1],
    "--mw": mouth.size[0],
    "--mh": mouth.size[1],
    backgroundImage: `url(/pixies/${pixie}.png)`,
  } as CSSProperties;

  return (
    <span
      role="img"
      aria-label={`${pixie} pixie, ${state}`}
      className={`sprite sprite-${state} face-${mouth.facePeak} ${className ?? ""}`}
      style={style}
      // Restart the animation when the state changes so one-shot rows (happy) replay.
      key={`${pixie}-${state}`}
    >
      <span className={`mouth ${talking ? "mouth-talk" : ""}`} style={mouthStyle} />
    </span>
  );
}
