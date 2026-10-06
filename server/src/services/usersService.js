import {
  getAllUsers,
  deleteUserById,
  findUserByEmail,
  findUserById,
  createUser,
} from "../../DAL/users.dal.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import "dotenv/config";

export const registerService = async (data) => {
  const { email, password } = data;
  const alreadyEmailExist = await findUserByEmail(email);
  if (alreadyEmailExist) {
    throw new AppError("Email already exist", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const userId = await createUser({ ...data, password: hashedPassword });
  const user = await findUserById(userId);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    },
    token,
  };
};

export const loginService = async (data, role) => {
  if (role !== "admin") {
    throw new AppError("Forbiden", 403);
  }
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Email or password is false", 404);
  }
  const isMatch = await bcrypt.compare(existByEmail.password, password);
  if (!isMatch) {
    throw new AppError("Email or password is false", 404);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    },
    token,
  };
};

export const getAllUserService = async (role) => {
  if (role !== "admin") {
    throw new AppError("Forbiden", 403);
  }
  const users = await getAllUsers();
  for (const user of users) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    };
  }
};

export const getCurrentUserService = async (userId) => {
  const user = await findUserById(userId);
  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    },
  };
};

export const deleteUSerService = async (userId, role) => {
  if (role !== "admin") {
    throw new AppError("Forbiden", 403);
  }
  return await deleteUserById(userId);
};
