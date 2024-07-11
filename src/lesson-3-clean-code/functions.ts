// number of arguments
const registerUser = (
  name: string,
  age: number,
  city: string,
  id: string,
  idType: string,
  ensurance: string,
  employerName: string,
) => {};

registerUser("sebas", 23, "medellin", "123", "cedula", "sura", "sm");

// {name : string , age : number, city : string, id : string , idType : string , ensurance : string, employerName : string}

interface User {
  name: string;
  age: number;
  city: string;
  id: string;
  idType: string;
  ensurance: string;
  employerName: string;
}

const registerUser2 = (user: User) => {
  const { name, age, city, id, idType, ensurance, employerName } = user;
};

registerUser2({
  age: 12,
  city: "medellin",
  employerName: "sm",
  ensurance: "sura",
  id: "123",
  idType: "cedula",
  name: "sebas",
});

// mutations

const user = {
  id: undefined,
  name = "max ",
};

// change for addId if function is needed
const createId = (user: { id: undefined | string; name: string }) => {
  user.id = "123";
};

createId(user);

class UserTest {
  constructor(name: string) {
    this.name = name;
  }

  addId() {
    this.id = "";
  }
}

const user1 = new UserTest("juan");

user1.addId();
// levels of abstraction

const isEmailValid = (email: string) => {
  return email.includes("@");
};

const saveNewUser = (email: string, name: string) => {
  if (email.includes("@")) {
    throw Error("invalid email");
  }
};
