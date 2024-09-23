import { Request, Response } from "express";
import { WorkedPiecesTableService } from "./worked-pieces.service";

const workedPiecesTableService = new WorkedPiecesTableService();

export const getWorkedPiecesTableData = async (req: Request, res: Response) => {
  try {
    const { cd_linea } = req.params;
    const row_limit = parseInt(req.query.limit as string, 10) || 25;
    const style = req.query.style as string | undefined;
    const stage = req.query.stage as string | undefined;
    const name = req.query.name as string | undefined;

    if (!cd_linea || isNaN(row_limit)) {
      return res
        .status(400)
        .json({ error: "cd_linea and valid limit are required" });
    }

    const filters = { style, stage, name };
    const data = await workedPiecesTableService.getWorkedPiecesTableData(
      cd_linea,
      row_limit,
      filters
    );

    if (data) {
      // console.log("Data found:", data);
      return res.json(data);
    } else {
      return res.status(404).json({ error: "Data not found" });
    }
  } catch (err) {
    console.error("Error in getWorkedPiecesTableData:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
