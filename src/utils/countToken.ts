/**
 * Counts the number of tokens (words) in a given string.
 *
 * A token is defined as any sequence of non-whitespace characters
 * separated by one or more whitespace characters. Leading and trailing
 * whitespace are ignored during the count.
 *
 * @param value - The string for which tokens are to be counted.
 * @returns The number of tokens in the input string.
 *
 */
export const countToken = (value: string) => {
  return value
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};
