export const SITE_URL = "https://deskpixie.ai";
export const SITE_NAME = "DeskPixie";
// "Desktop voice pixie" is the product README's own description; keep the two in step.
export const SITE_TITLE = "DeskPixie: a desktop voice pixie for your coding agents on macOS";
export const SITE_DESCRIPTION =
  "DeskPixie is a desktop voice pixie you talk to out loud. It hands real work to Claude Code or Codex agents, watches your sessions, and tells you when they're done. Free and open source (Apache 2.0) for macOS.";
export const LICENSE_URL = "https://www.apache.org/licenses/LICENSE-2.0";
// Google Search Console HTML-tag token (the `content` value). Leave empty to emit nothing;
// the DNS TXT route in docs/search-console.md needs no token.
export const GOOGLE_SITE_VERIFICATION = "";

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

// The mouth is a separate layer, as in the app: `mouth` in each pixie.json gives its row in the
// sheet (column = openness level 0–3, 0 at rest), its top-left anchor in the cell and its size.
// `facePeak` is the lowest value of the happy row's faceDy, which lifts the mouth with the face.
export const MOUTHS: Record<
  PixieId,
  { row: number; anchor: [number, number]; size: [number, number]; facePeak: 2 | 3 }
> = {
  bit: { row: 5, anchor: [12, 20], size: [8, 5], facePeak: 2 },
  blackgold: { row: 6, anchor: [25, 14], size: [4, 5], facePeak: 3 },
  dino: { row: 6, anchor: [22, 14], size: [7, 4], facePeak: 3 },
  flash: { row: 6, anchor: [25, 21], size: [5, 3], facePeak: 2 },
};

export const STATE_ROWS: Record<PixieState, number> = {
  idle: 0,
  listening: 1,
  thinking: 2,
  delegating: 3,
  happy: 4,
};
