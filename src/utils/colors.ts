export const colorsPalette = [
  'rgba(42, 157, 144, 1)',
  'rgba(231, 110, 80, 1)',
  'rgba(39, 71, 84, 1)',
  'rgba(232, 196, 104, 1)',
  'rgba(244, 164, 98, 1)',
  'rgba(255, 128, 128, 1)',
  'rgba(204, 0, 102, 1)',
  'rgba(0, 153, 204, 1)',
  'rgba(86, 66, 86, 1)',
  'rgba(252, 129, 74, 1)',
  'rgba(244, 235, 217, 1)',
  'rgba(63, 64, 63, 1)',
  'rgba(212, 231, 158, 1)',
  'rgba(50, 130, 184, 1)',
  'rgba(114, 148, 155, 1)',
  'rgba(177, 89, 80, 1)',
  'rgba(124, 89, 33, 1)',
  'rgba(237, 118, 14, 1)',
  'rgba(188, 163, 107, 1)',
  'rgba(142, 136, 137, 1)',
  'rgba(112, 193, 179, 1)',
  'rgba(232, 161, 134, 1)',
  'rgba(0, 119, 182, 1)',
  'rgba(74, 74, 75, 1)',
  'rgba(168, 218, 220, 1)',
  'rgba(233, 196, 106, 1)',
  'rgba(241, 250, 238, 1)',
  'rgba(38, 70, 83, 1)',
  'rgba(42, 157, 143, 1)',
  'rgba(233, 110, 60, 1)',
  'rgba(229, 194, 104, 1)',
  'rgba(244, 163, 99, 1)',
  'rgba(253, 128, 128, 1)',
  'rgba(50, 131, 185, 1)',
  'rgba(113, 148, 155, 1)',
  'rgba(176, 89, 80, 1)',
  'rgba(124, 90, 33, 1)',
  'rgba(236, 118, 14, 1)',
  'rgba(188, 163, 106, 1)',
  'rgba(112, 192, 179, 1)',
  'rgba(231, 161, 134, 1)',
  'rgba(0, 119, 181, 1)',
  'rgba(73, 74, 75, 1)',
  'rgba(168, 218, 219, 1)',
  'rgba(240, 250, 238, 1)',
  'rgba(37, 70, 83, 1)'
];



export function randomColors(targetArray?: any[]): string[] {
  const array = targetArray || colorsPalette
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}