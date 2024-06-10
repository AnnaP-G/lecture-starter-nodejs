import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const userData = authService.login(req.body);
      if (!userData) {
        const error = new Error("Login failed. Check your credentials.");
        error.code = 401;
        error.status = "Unauthorized";
        throw error;
      }
      res.data = userData;
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };

// TODO: Implement login action (get the user if it exist with entered credentials)
