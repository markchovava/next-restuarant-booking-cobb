/**
 * Trims a string to a specified maximum length and appends "..." if it was trimmed.
 * If the input string is null, undefined, or empty, it returns an empty string.
 *
 * @param str The input string to potentially trim.
 * @param num The maximum length the string should be before trimming.
 * @returns The trimmed string with "..." appended, or the original string.
 */
export function trimString(str: string | null | undefined, num: number): string {
  // Check for falsy values (null, undefined, or empty string if it were passed as such)
  if (!str) {
    return "";
  }

  // NOTE: The original JavaScript function uses a fixed length of '20' in the substring call,
  // but uses the variable 'num' for the length check.
  // I have corrected the substring to use 'num' as well, which is the standard expectation.
  // If you specifically intended to always trim to 20, use '20' instead of 'num' below.

  // Standard (using 'num' for both check and trimming):
  // return str.length > num ? str.substring(0, num) + "..." : str;

  // Matching the behavior of the original JS (using 20 for trimming):
  return str.length > num ? str.substring(0, 20) + "..." : str;
}


export const stringToUpper = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};