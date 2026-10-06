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

export const registerService = async (data, roleAdmin) => {
  const { email, password, role, username, assignedArea } = data;
  if (roleAdmin !== "admin") {
    throw new AppError("Forbiden", 403);
  }
  const alreadyEmailExist = await findUserByEmail(email);
  if (alreadyEmailExist) {
    throw new AppError("Email already exist", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const userId = await createUser({
    email,
    password: hashedPassword,
    username,
    assignedArea,
    role,
  });
  const user = await findUserById(userId);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return {
    user: {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    },
    token,
  };
};

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Email or password is false", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

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
      id: user._id.toString(),
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
  const userList = [];
  for (const user of users) {
    const newUser = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      assignedArea: user.assignedArea,
    };
    userList.push({ user: newUser });
  }
  return userList;
};

export const getCurrentUserService = async (userId) => {
  const user = await findUserById(userId);
  return {
    user: {
      id: user._id.toString(),
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
