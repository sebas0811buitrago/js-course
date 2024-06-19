const conditions = [
  {
    messageModule: 'Fizz',
    moduleNumber: 3
  },

  {
    messageModule: 'Buzz',
    moduleNumber: 5
  }
];

const MessageModule = (number: number) => {
  const finalMessage = conditions.reduce(
    (accumulator, { messageModule, moduleNumber }) => {
      return accumulator + (number % moduleNumber === 0 ? messageModule : '');
    },
    ''
  );

  return finalMessage;
};
