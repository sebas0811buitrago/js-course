// function declaration and implementationshould be readable, order and amount of arguments matters
// if possible max 2 arguments

const saveInDatabase = <T>(value: T): number => {
  console.log(value);

  return 1;
};

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

sum(0, 1, 2, 3, 4, 4, 5, 6, 7);

//  function should be small and do one thing - single responsability principle =>
type PatientData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
  };
};

const processAndDisplayPatientData = (data: PatientData) => {
  const transformedData = {
    name: data.firstName + " " + data.lastName,
    age: new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear(),
    address: data.address.street + ", " + data.address.city,
  };

  console.log("Name:", transformedData.name);
  console.log("Age:", transformedData.age);
  console.log("Address:", transformedData.address);
};

const sampleData: PatientData = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1980-01-01",
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
};

processAndDisplayPatientData(sampleData);

// Function to transform patient data
const transformPatientData = (data: PatientData): TransformedPatientData => {
  const name = `${data.firstName} ${data.lastName}`;
  const age =
    new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear();
  const address = `${data.address.street}, ${data.address.city}`;

  return { name, age, address };
};

type TransformedPatientData = {
  name: string;
  age: number;
  address: string;
};

// Function to display patient data
const displayPatientData = (data: TransformedPatientData): void => {
  // document.querySelector(".name").innerHTML = data.name;
  // document.querySelector(".age").innerHTML = data.age.toString();
  // document.querySelector(".address").innerHTML = data.address;
};

// Using the functions
const transformedData = transformPatientData(sampleData);
displayPatientData(transformedData);

// what happens if i want to show the data in the UI? I would only have to touch displayPatientData

//  functions should have one level of abstraction
// levels of abstraction are layers
// high level of abstraction, uses meaningful names (Bussines Rules )
// low level of abstraction, algorithms, data acces code  (Implementation details )

const dBCreateAccount = (user: User) => {
  console.log(user);
};

const createBankAccount = (user: User) => {
  if (user.age > 18) {
    console.log("Error : User doesn't mimimum age");
    return;
  }

  dBCreateAccount(user);
};

createBankAccount({
  age: 12,
  city: "medellin",
  employerName: "sm",
  ensurance: "sura",
  idType: "cedula",
  name: "sebas",
});

const hasUserLegalAge = (user: User) => {
  return user.age > 18;
};

const showError = (message: string) => {
  console.log(message);
};

const createBankAccountHighLevel = (user: User) => {
  if (!hasUserLegalAge(user)) {
    showError("Error : User doesn't mimimum age");
  }

  dBCreateAccount(user);
};

createBankAccountHighLevel({
  age: 12,
  city: "medellin",
  employerName: "sm",
  ensurance: "sura",
  idType: "cedula",
  name: "sebas",
});
