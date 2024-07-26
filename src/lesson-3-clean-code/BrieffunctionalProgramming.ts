// data types

// primitives

const person1 = "maria";

const person2 = "maria";

person1 === person2; // true

// referenced

const user1 = {
  name: "maria",
};

const user2 = {
  name: "maria",
};

user1 === user2; // false
user1.name = user2.name; // true

const user3 = user1;
user3.name = "isabel";

user1.name === user3.name; // true

// pure functions, same outputs wih same inputs, no side effects
const square = (x: number) => x * x;

square(3); // 9
square(3); // 9
square(2); // 4
square(2); // 4

//side effects

const user = {
  name: "sebas",
  usos: 0,
};

const contarUsos = (user: { name: string; usos: number }) => {
  user.usos++;

  return user.usos;
};

contarUsos(user); // 1
contarUsos(user); // 2
user.usos = 0;
contarUsos(user); // 1

// pure way of doing it
const contarUsosPureVersion = (user: { name: string; usos: number }) => {
  return { ...user, usos: user.usos + 1 };
};

contarUsosPureVersion(user); // 1
contarUsosPureVersion(user); // 1
contarUsosPureVersion(user); // 1

contarUsosPureVersion(contarUsosPureVersion(contarUsosPureVersion(user))); // 3

// other side effect

function print() {
  console.log("Hi world");
}

print();

const fetchSpells = async () => {
  const res = await fetch("https://potterapi-fedeperin.vercel.app/en/spells");
  const spells = await res.json();

  return spells;
};

fetchSpells();

//CHALLENGE, transform this impure function to a pure one
const numbers: number[] = [];

function appendRandomNumber() {
  const randomNumber = Math.random();
  numbers.push(randomNumber);
  return numbers;
}

appendRandomNumber();
