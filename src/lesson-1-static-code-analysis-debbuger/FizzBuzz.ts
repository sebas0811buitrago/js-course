const conditions = [
  {
    messageModule: 'Fizz',
    moduleNumber: 3,
  },

  {
    messageModule: 'Buzz',
    moduleNumber: 5,
  },
];

const fizzBuzz = (number: number) => {
  if (0 === number) return 0;

  const positiveNumber = Math.abs(number);
  const finalMessage = conditions.reduce(
    (accumulator, { messageModule, moduleNumber }) => {
      return (
        accumulator + (positiveNumber % moduleNumber === 0 ? messageModule : '')
      );
    },
    '',
  );

  return finalMessage ? finalMessage : number;
};

export default fizzBuzz;
