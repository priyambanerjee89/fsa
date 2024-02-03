export const isBinary = (input: string): boolean => {
  return /^[01]+$/.test(input);
};
