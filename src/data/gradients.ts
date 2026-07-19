import type { GradientPreset } from "../interfaces/gradientPreset";

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "fuxia",
    label: "Fuxia",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 20, 147, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 182, 193, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 105, 180, 0.8) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 215, 0, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #ffd6e8 0%, #fff5f9 100%)
    `,
  },
  {
    id: "giallo-caldo",
    label: "Giallo caldo",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 213, 0, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 154, 0, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 126, 95, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 235, 59, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #ffefba 0%, #fffdf0 100%)
    `,
  },
  {
    id: "verde",
    label: "Verde",
    value: `
      radial-gradient(at 0% 0%, rgba(76, 175, 80, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(168, 224, 99, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(0, 191, 165, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(205, 220, 57, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #e0f7dc 0%, #f4fff0 100%)
    `,
  },
  {
    id: "celeste",
    label: "Celeste",
    value: `
      radial-gradient(at 0% 0%, rgba(135, 206, 235, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(74, 144, 217, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(179, 157, 219, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(200, 230, 255, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #dff3ff 0%, #f5fbff 100%)
    `,
  },
  {
    id: "rosa",
    label: "Rosa",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 158, 196, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 211, 182, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 111, 165, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 235, 238, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #ffe3ee 0%, #fff8fa 100%)
    `,
  },
  {
    id: "giallo-azzurro",
    label: "Giallo e azzurro",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 213, 0, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(74, 144, 217, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 213, 0, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(74, 144, 217, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #fff6d5 0%, #eaf4ff 100%)
    `,
  },
  {
    id: "arancione",
    label: "Arancione",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 140, 0, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 213, 79, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 87, 34, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 193, 7, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #ffe2ba 0%, #fff9f0 100%)
    `,
  },
  {
    id: "blu",
    label: "Blu",
    value: `
      radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(79, 195, 247, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(123, 104, 238, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(100, 149, 237, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #dbe6ff 0%, #f2f6ff 100%)
    `,
  },
  {
    id: "rosso",
    label: "Rosso",
    value: `
      radial-gradient(at 0% 0%, rgba(229, 57, 53, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(255, 112, 67, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(183, 28, 28, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 138, 101, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #ffd9d4 0%, #fff5f3 100%)
    `,
  },
  {
    id: "viola",
    label: "Viola",
    value: `
      radial-gradient(at 0% 0%, rgba(156, 39, 176, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(186, 104, 200, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(103, 58, 183, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(225, 190, 231, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #f3e5f5 0%, #faf5fb 100%)
    `,
  },
  {
    id: "indaco",
    label: "Indaco",
    value: `
      radial-gradient(at 0% 0%, rgba(63, 81, 181, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(92, 107, 192, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(48, 63, 159, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(197, 202, 233, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #e8eaf6 0%, #f5f6fc 100%)
    `,
  },
  {
    id: "turchese",
    label: "Turchese",
    value: `
      radial-gradient(at 0% 0%, rgba(0, 188, 212, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(77, 208, 225, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(0, 151, 167, 0.7) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(178, 235, 242, 0.7) 0, transparent 50%),
      linear-gradient(135deg, #e0f7fa 0%, #f2fdfe 100%)
    `,
  },
  {
    id: "grigio",
    label: "Grigio",
    value: `
      radial-gradient(at 0% 0%, rgba(158, 158, 158, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(189, 189, 189, 0.5) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(117, 117, 117, 0.5) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(224, 224, 224, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #f0f0f0 0%, #fafafa 100%)
    `,
    textColor: "dark",
  },
  {
    id: "marrone",
    label: "Marrone",
    value: `
      radial-gradient(at 0% 0%, rgba(121, 85, 72, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(161, 136, 127, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(78, 52, 46, 0.6) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(215, 204, 200, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #f5e6d3 0%, #fff8f0 100%)
    `,
    textColor: "dark",
  },
  {
    id: "bianco",
    label: "Bianco",
    value: `
      radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.9) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(245, 245, 245, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(238, 238, 238, 0.8) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(250, 250, 250, 0.8) 0, transparent 50%),
      linear-gradient(135deg, #ffffff 0%, #fbfbfb 100%)
    `,
    textColor: "dark",
  },
  {
    id: "nero",
    label: "Nero",
    value: `
      radial-gradient(at 0% 0%, rgba(66, 66, 66, 0.8) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(33, 33, 33, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(0, 0, 0, 0.8) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(97, 97, 97, 0.6) 0, transparent 50%),
      linear-gradient(135deg, #1a1a1a 0%, #000000 100%)
    `,
    textColor: "light",
  },
  {
    id: "argento",
    label: "Argento",
    value: `
      radial-gradient(at 0% 0%, rgba(192, 192, 192, 0.7) 0, transparent 50%),
      radial-gradient(at 100% 0%, rgba(220, 220, 220, 0.6) 0, transparent 50%),
      radial-gradient(at 100% 100%, rgba(160, 160, 160, 0.55) 0, transparent 50%),
      radial-gradient(at 0% 100%, rgba(255, 224, 178, 0.35) 0, transparent 50%),
      linear-gradient(135deg, #f5f5f0 0%, #fffaf0 100%)
    `,
    textColor: "dark",
  },
];

export const GRADIENTS: Record<string, string> = Object.fromEntries(
  GRADIENT_PRESETS.map((preset) => [preset.id, preset.value]),
);

export const TEXT_COLORS: Record<string, "dark" | "light"> = Object.fromEntries(
  GRADIENT_PRESETS.map((preset) => [preset.id, preset.textColor ?? "dark"]),
);
