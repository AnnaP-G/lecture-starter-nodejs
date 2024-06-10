import { FIGHTER } from "../models/fighter.js";

const validateField = (value, validationRule, errorMessage) => {
  if (!value || !validationRule(value)) {
    throw new Error(errorMessage);
  }
};

const validateFields = (req, res, next, isCreation) => {
  const fields = Object.keys(req.body);
  const expectedFields = isCreation
    ? Object.keys(FIGHTER).filter((key) => key !== "id")
    : Object.keys(FIGHTER);

  if (fields.length !== expectedFields.length) {
    throw new Error("Invalid number of fields.");
  }

  fields.forEach((field) => {
    if (!expectedFields.includes(field)) {
      throw new Error(`Invalid field ${field}.`);
    }
    if (!req.body[field]) {
      throw new Error(`Empty field ${field}.`);
    }
  });
};

const createFighterValid = (req, res, next) => {
  try {
    validateFields(req, res, next, true);
    validateField(
      req.body.name,
      (name) => /^[a-zA-Z]+$/.test(name),
      "Invalid fighter name or empty field."
    );
    validateField(
      req.body.power,
      (power) =>
        !isNaN(Number(power)) && Number(power) >= 0 && Number(power) <= 85,
      "Power must be in the range 0 - 85."
    );
    validateField(
      req.body.defense,
      (defense) =>
        !isNaN(Number(defense)) &&
        Number(defense) >= 1 &&
        Number(defense) <= 10,
      "Defence must be in the range 1 - 10."
    );

    const fighter = fighterService.getOneFighter({ name: req.body.name });
    if (fighter) {
      throw new Error(
        `This fighter ${req.body.name} has already been created. `
      );
    }

    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    validateFields(req, res, next, false);
    validateField(
      req.params.id,
      (id) => typeof id === "string" && id.trim() !== "",
      "Invalid fighter id."
    );

    const fighter = fighterService.getOneFighter({ id: req.params.id });
    if (!fighter) {
      throw new Error(`This fighter id ${req.params.id} was not found.`);
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    validateField(
      req.body.name,
      (name) => /^[a-zA-Z]+$/.test(name),
      "Invalid fighter name or empty field."
    );
    validateField(
      req.body.power,
      (power) =>
        !isNaN(Number(power)) && Number(power) >= 0 && Number(power) <= 85,
      "Power must be in the range 0 - 85."
    );
    validateField(
      req.body.defense,
      (defense) =>
        !isNaN(Number(defense)) &&
        Number(defense) >= 1 &&
        Number(defense) <= 10,
      "Defence must be in the range 1 - 10."
    );

    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

export { createFighterValid, updateFighterValid };
