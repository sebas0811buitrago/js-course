// Prefer positive checks over negative checks

const notHAsLegalAge = (age: number) => age < 18;

const saveInDatabase = (user: string) => {
  console.log(user);
};

const createBankAccount = ({ user, age }: { user: string; age: number }) => {
  if (!notHAsLegalAge(age)) {
    saveInDatabase(user);
  }
};

createBankAccount({
  user: "sebas",
  age: 27,
});

// work with default parameters to avoid if checks

function greet(name?: string, greeting?: string) {
  if (name === undefined) {
    name = "Guest";
  }
  if (greeting === undefined) {
    greeting = "Hello";
  }
  return `${greeting}, ${name}!`;
}

function greetDefaultParameters(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

greet();
greetDefaultParameters();

// use guard clauses to avoid deep nesting conditionals,  utilize native errors to get rid of unnecesary if checks

interface User {
  name: string;
  age: number;
  city: string;
}

const saveUser = (user: User) => {
  console.log(user);
};

const allowedCities = ["medellin", "rionegro"];
const registerUser = (user: User) => {
  const { name, age, city } = user;

  // validations

  if (name) {
    if (age != null) {
      if (city) {
        if (allowedCities.includes(city)) {
          saveUser(user);
        } else {
          console.log("city is not allowed");
        }
      } else {
        console.log("city is required");
      }
    } else {
      console.log("age is required");
    }
  } else {
    console.log("name is required");
  }
};

registerUser({
  name: "sebas",
  age: 12,
  city: "medellin",
});

//refactor 1 guard clauses
const registerUserGuardClauses = (user: User) => {
  const { name, age, city } = user;

  if (!name) {
    console.log("name is required");
    return;
  }

  if (age == null) {
    console.log("age is required");
    return;
  }

  if (!city) {
    console.log("city is required");
    return;
  }

  if (allowedCities.includes(city)) {
    console.log("city is not allowed");
  }
  saveUser(user);
};

registerUserGuardClauses({
  name: "sebas",
  age: 12,
  city: "medellin",
});
// refactor 2 throw errors, and separate by levels of abstraction

class FieldError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

const checkRequiredValue = (name: string, value: string) => {
  if (value) return;
  throw new FieldError(name, `${name} is required`);
};

const checkRequiredNumber = (name: string, value: number) => {
  if (value != null) return;
  throw new FieldError(name, `${name} is required`);
};

const checkAllowedCities = (name: string, value: string) => {
  if (allowedCities.includes(value)) return;
  throw new FieldError(name, `${name} is not allowed`);
};

const registerUserWithErrors = (user: User) => {
  const { name, age, city } = user;

  checkRequiredValue("name", name);
  checkRequiredNumber("age", age);
  checkRequiredValue("city", city);
  checkAllowedCities("city", city);

  saveUser(user);
  console.log("user registered");
};

try {
  registerUserWithErrors({
    name: "sebas",
    age: 12,
    city: "medellin",
  });
} catch (error) {
  if (error instanceof FieldError) {
    console.log(error.message);
    // document.querySelector(`[name="${error.name}"] .error`) = error.message
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
