/**
 * Formats a size in bytes for people: B, KB or MB, with the decimals and the
 * separator of the interface language. Below 10 KB it shows two decimals, and
 * one decimal above that.
 */
export function formatSize(bytes: number, locale: string): string {
  const units: [string, number][] = [
    ['MB', 1024 * 1024],
    ['KB', 1024],
  ];
  for (const [unit, size] of units) {
    if (bytes >= size) {
      const value = bytes / size;
      const digits = value < 10 ? 2 : 1;
      const text = new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);
      return `${text} ${unit}`;
    }
  }
  return `${bytes} B`;
}
