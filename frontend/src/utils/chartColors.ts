// Utility functions for chart color generation
export function buildChartColors(count: number, alpha = 0.75): string[] {
  return Array.from({ length: count }, (_, index) => {
    const hue = Math.round((index * 137.508) % 360);
    return `hsla(${hue}, 75%, 55%, ${alpha})`;
  });
}
