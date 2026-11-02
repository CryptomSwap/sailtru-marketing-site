/**
 * The harbor palette in one place.
 *
 * HTML uses the matching CSS custom properties on `.harbor` (harbor.css:
 * --paper, --ink, --cobalt, ...). The 3D scene and the SVG fallback read the
 * constants below. To change the accent (cobalt today), change ACCENT here and
 * --cobalt / --cobalt-deep / --cobalt-wash in harbor.css.
 */
export class HarborTheme {
  /** Accent: SailTru's boat, the active finding (F01), the route, the shipped change and the primary action. */
  static readonly ACCENT = "#2448e0";
  static readonly ACCENT_DEEP = "#1a35ad";
  static readonly INK = "#22252b";
  static readonly PAPER = "#f5f0e6";
  static readonly CREAM = "#f7f2e7";

  static readonly SKY_TOP = "#f8f4ec";
  static readonly SKY_MID = "#f4eee2";
  static readonly SKY_HORIZON = "#ece4d4";
  static readonly SEA_NEAR = "#cfd6d2";
  static readonly SEA_FAR = "#e3e2d8";
  static readonly SEA_CREST = "#f1efe6";
  static readonly LAMP = "#ffe2a0";
  static readonly WINDOW_LIT = "#ffd98a";
}
