import { success } from "zod";
import { AppError } from "./AppError.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: error.issues?.[0]?.message || "Validation error",
    });
  }

  if (error.name === "BSONError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
