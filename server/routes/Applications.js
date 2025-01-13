import express from "express";
const router = express.Router();
import ApplicationsController from "../controllers/ApplicationsController.js";

router.get(
  "/applications/:userId",
  ApplicationsController.getApplicationsByUser
);
router.post("/application/create", ApplicationsController.createApplication);

router.get("/application/:appId", ApplicationsController.getApplicationById);
router.post(
  "/application/update/:appId",
  ApplicationsController.updateApplicationById
);

export default router;
