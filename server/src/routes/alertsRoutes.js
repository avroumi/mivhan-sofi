import { Router } from "express";
import {
  ValidCreateALert,
  ValidUpdateAlert,
  ValidId,
} from "../schema/alertsSchema.js";
import { validateMiddleware } from "../utils/validateMiddelware.js";
import {
  getAlertByIdController,
  getAllAlertController,
  updateAlertController,
  createAlertController,
  deleteAlertController,
} from "../controllers/alertsControllers.js";

const router = Router();

router.get("/alerts/", getAllAlertController);
router.get(
  "/alerts/:id",
  validateMiddleware(ValidId, "params"),
  getAlertByIdController,
);
router.post(
  "/alerts",
  validateMiddleware(ValidCreateALert),
  createAlertController,
);
router.delete(
  "/alerts/:id",
  validateMiddleware(ValidId, "params"),
  deleteAlertController,
);

router.put(
  "/alerts/:id",
  validateMiddleware(ValidId, "params"),
  validateMiddleware(ValidUpdateAlert),
  updateAlertController,
);

export default router;
