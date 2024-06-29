export const noSevens = (number: number) => {
  if (number === 0) return 0;
  if (number % 7 === 0) return null;
  if (number.toString().includes('7')) return null;
  return number;
};
