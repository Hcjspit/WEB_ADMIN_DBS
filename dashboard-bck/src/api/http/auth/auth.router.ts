import express from "express";
import { validate } from "class-validator";
import { LoginDTO } from "./auth.dto";
import { handleLogin } from "./auth.controller";
import { handleLogout } from "./auth.controller";
import { verifyToken } from "./auth.service";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/logout", verifyToken, handleLogout);

export default router;
