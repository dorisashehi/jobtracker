import express from "express";
const router = express.Router();
import ApplicationsController from "../controllers/ApplicationsController.js";

router.get(
  "/applications/:userId",
  ApplicationsController.getApplicationsByUser
);
router.post("/application/create", ApplicationsController.createApplication);

router.get("/application/:appId", ApplicationsController.getApplicationById);
router.patch(
  "/application/update/:appId",
  ApplicationsController.updateApplicationById
);

router.get(
  "/application/delete/:appId",
  ApplicationsController.deleteApplicationById
);

export default router;
