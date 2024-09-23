import { connectToDB } from "../../../dbConfig";
import * as oracledb from "oracledb";
import { Server } from "socket.io";
import { BigTable, SmallTable } from "./table.entity";

export class TableService {
  private io: Server;

  constructor(io: Server) {}

  async getSmallTableData(): Promise<SmallTable | null> {
    let connection: oracledb.Connection | undefined;
    console.log("Querying Oracle DB for SmallTable Data");
    try {
      connection = await connectToDB();
      const query = `SELECT count(distinct(CD_LINEA)) TOTAL_LINES ,sum(TOTAL_MACHINES) TOTAL_MACHINES, SUM(TARGET) as TOTAL_TARGET, SUM(OUTPUT) as TOTAL_OUTPUT,SUM(ACTIVE_CADRE) as TOTAL_ACTIVE_CADRE,
      AVG(EFFICIENCY_PERC) AVG_EFFICIENCY_PERC ,  AVG(DHU_PERC) AVG_DHU_PERC, AVG(REJECTION_PERC) AVG_REJECTION_PERC, MAX(EFF_TOTAL) AS EFF_TOTAL from BIG_SCREEN_H H WHERE CD_UNITA = 001  AND TOTAL_MACHINES <> 0`;
      const result = await connection.execute<SmallTable>(query, [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
      if (result.rows?.length) {
        return result.rows[0] as SmallTable;
      }
    } catch (err) {
      console.error("Error connecting to DB:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error(
            "Errore durante la chiusura della connessione al database Oracle:",
            error
          );
        }
      }
    }
    return null;
  }

  async getBigTableData(): Promise<BigTable[] | null> {
    let connection: oracledb.Connection | undefined;
    console.log("Querying Oracle DB for BigTable Data");
    try {
      connection = await connectToDB();
      const query = `SELECT *  FROM BIG_SCREEN_H WHERE CD_UNITA = 001  AND OUTPUT <> 0 AND TOTAL_MACHINES <> 0 order by CD_LINEA`;
      const result = await connection.execute<BigTable>(query, [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
      if (result.rows?.length) {
        return result.rows as BigTable[];
      }
    } catch (err) {
      console.error("Error connecting to DB:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error(
            "Errore durante la chiusura della connessione al database Oracle:",
            error
          );
        }
      }
    }
    return null;
  }
}
