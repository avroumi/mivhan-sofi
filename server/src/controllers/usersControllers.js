import { success } from "zod";
import {
  loginService,
  registerService,
  deleteUSerService,
  getAllUserService,
  getCurrentUserService,
} from "../services/usersService.js";

export const loginController = async (req, res, next) => {
  try {
    const data = await loginService(req.body);
    res.send(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const registerController = async (req, res, next) => {
  try {
    const data = await registerService(req.body, req.user.role);
    res.send(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUserController = async (req, res, next) => {
  try {
    const data = await deleteUSerService(req.params.id, req.user.role);
    res.send(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const data = await getAllUserService(req.user.role);
    res.send(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserController = async (req, res, next) => {
  try {
    const data = await getCurrentUserService(req.user.id);
    res.send(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
