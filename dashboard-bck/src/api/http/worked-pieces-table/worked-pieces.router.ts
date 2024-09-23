import express from "express";
import { getWorkedPiecesTableData } from "./worked-pieces.controller";

const router = express.Router();

router.get("/tables/workedPieces/:cd_linea", getWorkedPiecesTableData);

export default router;
