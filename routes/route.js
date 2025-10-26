import express from "express";
import { showLogin, login, logout } from "../controllers/authController.js";
import { automotiveLubricants } from "../controllers/fuchsController.js";

const router = express.Router();

router.get("/", showLogin);
router.post("/login", login);
router.get("/logout", logout);
router.get("/fuchs", automotiveLubricants);

export default router;
