import jwt from "jsonwebtoken";
import { AppError } from "./AppError.js";
import "dotenv/config";

export const authMiddelware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new AppError("Unauthorized", 401);
    }
    const [bearer, token] = auth.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};
