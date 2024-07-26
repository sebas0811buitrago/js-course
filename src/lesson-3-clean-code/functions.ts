import { AddressModule } from "@faker-js/faker";

const saveInDatabase = <T>(value: T): number => {
  console.log(value);

  return 1;
};

// function declaration and implementationshould be readable, order and amount of arguments matters
// if possible max 2 arguments
const registerUser = (
  name: string,
  age: number,
  city: string,
  id: string,
  idType: string,
  ensurance: string,
  employerName: string,
) => {
  saveInDatabase({ name, age, city, id, idType, ensurance, employerName });
};

registerUser("sebas", 23, "medellin", "123", "cedula", "sura", "sm");

// it is better to use an object or split the function

interface User {
  name: string;
  age: number;
  city: string;

  idType: string;
  ensurance: string;
  employerName: string;
}

const registerUserCleanCode = (user: User) => {
  const { name, age, city, idType, ensurance, employerName } = user;

  saveInDatabase({ name, age, city, idType, ensurance, employerName });
};

registerUserCleanCode({
  age: 12,
  city: "medellin",
  employerName: "sm",
  ensurance: "sura",
  idType: "cedula",
  name: "sebas",
});

// other solution split function

const createUser = (name: string) => {
  const id = saveInDatabase({
    name,
  });

  return id;
};

const addCity = (id: number, city: string) => {
  saveInDatabase({
    id,
    city,
  });
};

const addAge = (id: number, age: number) => {
  saveInDatabase({
    id,
    age,
  });
};

const addEnsurance = (id: number, ensurance: string) => {
  saveInDatabase({
    id,
    ensurance,
  });
};

const userId = createUser("sebas");
addCity(userId, "Medellin");
addAge(userId, 20);
addEnsurance(userId, "sura");

// exception dynamic arguments
const sum = (...numbers: number[]) => {
  return numbers.reduce((accumulator, number) => accumulator + number, 0);
};

sum(0, 1, 2, 3, 4);

//  function should be small and do one thing => levels of abstracion => High level (declarative mode), low level (implementation details )

const isEmailValid = (email: string) => {
  return email.includes("@");
};

const saveNewUser = (email: string, name: string) => {
  if (email.includes("@")) {
    throw Error("invalid email");
  }
};
