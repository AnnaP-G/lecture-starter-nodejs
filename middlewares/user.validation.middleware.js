import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { email, phoneNumber } = req.body;

  try {
    checkExistingUser({ email, phoneNumber });
    validateFields(req.body, USER);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};
// TODO: Implement validatior for USER entity during creation

const updateUserValid = (req, res, next) => {
  const { id } = req.params;

  try {
    checkUserExistence(id);
    validateFields(req.body, USER);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const checkExistingUser = ({ email, phoneNumber }) => {
  const userEmail = userService.search({ email });
  const userPhoneNumber = userService.search({ phoneNumber });
  if (userEmail || userPhoneNumber) {
    throw new Error(`This user already exists.`);
  }
};

const checkUserExistence = (id) => {
  const user = userService.search({ id });
  if (!user || id !== user.id) {
    throw new Error(`User with id ${id} does not exist.`);
  }
};

const validateFields = (body, model) => {
  for (const key in model) {
    if (key !== "id" && !body.hasOwnProperty(key)) {
      throw new Error(`Missing field ${key}.`);
    }

    switch (key) {
      case "email":
        checkEmail(body.email);
        break;
      case "phoneNumber":
        checkPhoneNumber(body.phoneNumber);
        break;
      case "firstName":
      case "lastName":
        checkName(body[key]);
        break;
      case "password":
        checkPassword(body.password);
        break;
      default:
        break;
    }
  }
};

const checkEmail = (email) => {
  if (
    !email ||
    !email.match(/^[a-z0-9](\.?[a-z0-9]){1,}@g(oogle)?mail\.com$/i)
  ) {
    throw new Error(
      "Invalid email format. Only Gmail addresses with at least 2 characters before the @ symbol are allowed."
    );
  }
};

const checkPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || !phoneNumber.match(/\+380\d{9}/g)) {
    throw new Error(
      "Invalid phone number format. Please enter the number in the format: +380xxxxxxxxx."
    );
  }
};

const checkName = (name) => {
  if (!name || !name.match(/^[a-zA-Z]+$/)) {
    throw new Error("Invalid first or last name.");
  }
};

const checkPassword = (password) => {
  if (password.length < 3) {
    throw new Error("Password must be at least 3 characters long.");
  }
};

// TODO: Implement validatior for user entity during update

export { createUserValid, updateUserValid };
