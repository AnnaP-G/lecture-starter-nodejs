import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    const { winnerId, loserId, logs } = req.body;

    try {
      res.data = fightersService.create({
        fighter1: winnerId,
        fighter2: loserId,
        logs,
      });
    } catch (err) {
      res.err = err;
      res.status(400);
    } finally {
      next();
    }
  },
  responseMiddleware
);

// OPTIONAL TODO: Implement route controller for fights

export { router };
