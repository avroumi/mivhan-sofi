import {
  getAlertById,
  createALert,
  deleteAlert,
  updateALert,
} from "../../DAL/alerts.dal.js";
import { AppError } from "../utils/AppError.js";

export const getAlertByIdService = async (alertId) => {
  const alert = await getAlertById(alertId);
  if (!alert) {
    throw new AppError("Alert not found", 404);
  }
  return alert;
};

export const createAlertService = async (data) => {
  const alertId = await createALert(data);
  return await getAlertById(alertId);
};

export const deleteAlertService = async (alertId) => {
  const alert = await getAlertById(alertId);
  if (!alert) {
    throw new AppError("Alert not found", 404);
  }
  return await deleteAlert(alertId);
};

export const updateAlertService = async (alertId, data) => {
  const alert = await getAlertById(alertId);
  if (!alert) {
    throw new AppError("Alert not found", 404);
  }
  if (Object.keys(data).length === 0) {
    throw new AppError("Data must be not empty", 400);
  }
  return await updateALert(alertId, data);
};
