import express from "express";
const router = express.Router();
import ApplicationsController from "../controllers/ApplicationsController.js";

router.get(
  "/applications/:userId",
  ApplicationsController.getApplicationsByUser
);

export default router;
