/**
 * Formats a number using the 'en-US' locale to include separators (e.g., 1000000 becomes "1,000,000").
 *
 * @param num The number to format.
 * @returns The number formatted as a localized string.
 */
export function formatNumber(num: number): string {
  // Use toLocaleString for number formatting based on the 'en-US' locale
  return num.toLocaleString('en-US');
}