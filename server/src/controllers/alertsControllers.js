import {
  getAlertByIdService,
  deleteAlertService,
  updateAlertService,
  createAlertService,
} from "../services/alertsService.js";
import { getAllAlerts } from "../../DAL/alerts.dal.js";

export const getAlertByIdController = async (req, res, next) => {
  try {
    const result = await getAlertByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAlertController = async (req, res, next) => {
  try {
    const result = await getAllAlerts();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createAlertController = async (req, res, next) => {
  try {
    const result = await createAlertService(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAlertController = async (req, res, next) => {
  try {
    const result = await deleteAlertService(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAlertController = async (req, res, next) => {
  try {
    const result = await updateAlertService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
