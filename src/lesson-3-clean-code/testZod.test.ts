import { z } from "zod";

const allowedCities = ["medellin", "rionegro"];

const UserSchema = z.object({
  name: z.string().min(1, "name is required"),
  age: z.number().nonnegative("age is required"),
  city: z
    .string()
    .min(1, "city is required")
    .refine((value) => allowedCities.includes(value), "city is not allowed"),
});

type UserBank = z.infer<typeof UserSchema>;

const saveUser = (user: UserBank) => {
  console.log(user);
};

const registerUserWithZod = (user: UserBank) => {
  UserSchema.parse(user);

  saveUser(user);
  console.log("user registered");
};

try {
  registerUserWithZod({
    name: "",
    age: null,
    city: "qwe",
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(error.formErrors);
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
