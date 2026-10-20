import type { CSSProperties } from "react";
import { STATE_ROWS, type PixieId, type PixieState } from "@/lib/site";

type Props = {
  pixie: PixieId;
  state?: PixieState;
  /** Device pixels per sprite pixel. */
  scale?: number;
  className?: string;
};

export function Sprite({ pixie, state = "idle", scale = 4, className }: Props) {
  const style = {
    "--w": `${32 * scale}px`,
    "--row": STATE_ROWS[state],
    backgroundImage: `url(/pixies/${pixie}.png)`,
  } as CSSProperties;

  return (
    <span
      role="img"
      aria-label={`${pixie} pixie, ${state}`}
      className={`sprite sprite-${state} ${className ?? ""}`}
      style={style}
      // Restart the animation when the state changes so one-shot rows (happy) replay.
      key={`${pixie}-${state}`}
    />
  );
}
