export const REPO_URL = "https://github.com/sihekuang/deskpixie";
export const DOWNLOAD_URL = `${REPO_URL}/releases/latest`;
export const REQUIREMENTS = "macOS 14+ · Apple silicon";

export type PixieId = "bit" | "blackgold" | "dino" | "flash";
export type PixieState = "idle" | "listening" | "thinking" | "delegating" | "happy";

// Mirrors pixies/<id>/pixie.json in the app: 32px cells, 8 frames per row, 8 fps.
export const PIXIES: Record<PixieId, { name: string; blurb: string }> = {
  bit: { name: "Bit", blurb: "The original. Round, green, a little antenna." },
  dino: { name: "Dino", blurb: "Small, loud, extremely sure your tests will pass." },
  flash: { name: "Flash", blurb: "Quick on its feet. Quicker with a summary." },
  blackgold: { name: "Black Gold", blurb: "Quiet, polished, never misses a finished turn." },
};

export const STATE_ROWS: Record<PixieState, number> = {
  idle: 0,
  listening: 1,
  thinking: 2,
  delegating: 3,
  happy: 4,
};
