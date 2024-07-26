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

          return { status: "error", message: "city is not allowed" };
        }
      } else {
        console.log("city is required");
        return { status: "error", message: "city is required" };
      }
    } else {
      console.log("age is required");
      return { status: "error", message: "age is required" };
    }
  } else {
    console.log("name is required");
    return { status: "error", message: "name is required" };
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
    return { status: "error", message: "name is required" };
  }

  if (age == null) {
    console.log("age is required");
    return { status: "error", message: "age is required" };
  }

  if (!city) {
    console.log("city is required");
    return { status: "error", message: "city is required" };
  }

  if (allowedCities.includes(city)) {
    console.log("city is not allowed");
    return { status: "error", message: "city is not allowed" };
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

// Challenge

type Order = {
  userId: number;
  productId: number;
  quantity: number;
};

type Customer = {
  id: number;
  name: string;
  balance: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const users: Customer[] = [
  { id: 1, name: "John Doe", balance: 100 },
  { id: 2, name: "Jane Doe", balance: 50 },
];

const products: Product[] = [
  { id: 1, name: "Widget", price: 25, stock: 10 },
  { id: 2, name: "Gadget", price: 50, stock: 5 },
];

function processOrder(order: Order): string {
  const user = users.find((u) => u.id === order.userId);
  if (user) {
    const product = products.find((p) => p.id === order.productId);
    if (product) {
      if (order.quantity > product.stock) {
        return "Not enough stock";
      }

      const totalCost = order.quantity * product.price;
      if (totalCost > user.balance) {
        // Process the order
        user.balance -= totalCost;
        product.stock -= order.quantity;

        return "Order processed successfully";
      } else {
        return "Insufficient funds";
      }
    } else {
      return "Product not found";
    }
  } else {
    return "User not found";
  }
}

processOrder({
  productId: 1,
  quantity: 5,
  userId: 1,
});
