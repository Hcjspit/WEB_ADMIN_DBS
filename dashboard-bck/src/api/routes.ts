import express from "express";
import authRouter from "./http/auth/auth.router";
import workedPiecesRouter from "./http/worked-pieces-table/worked-pieces.router";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.use("/auth", authRouter);
router.use("/get/", workedPiecesRouter);

export default router;
