import { connectToDB } from "../../../dbConfig";
import {
  DefectData,
  BigScreenData,
  TopLineData,
  OutputData,
} from "./dashboard.entity";
import * as oracledb from "oracledb";
import { Server } from "socket.io";

export class DashboardService {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  //Emitting Event Whit Socket
  async sendLineData(cd_linea: string) {
    try {
      const data = await this.getDataFromOracleDB(cd_linea);
      if (data) {
        this.io.emit("allDataResponse", data);
      }
      const defectData = await this.getTop3Defects(cd_linea);
      if (defectData) {
        this.io.emit("top3DefectsResponse", defectData);
      }
    } catch (err) {
      console.error("Error in sendLineData:", err);
    }
  }

  //Get ALL DATA
  async getDataFromOracleDB(cd_linea: string): Promise<BigScreenData | null> {
    let connection: oracledb.Connection | undefined;
    console.log(`Querying Oracle DB for line: ${cd_linea}`);
    try {
      connection = await connectToDB();
      const query = `SELECT * FROM BIG_SCREEN_H WHERE CD_LINEA = :cd_linea`;

      const result = await connection.execute<BigScreenData>(
        query,
        [cd_linea],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      if (result.rows?.length) {
        return result.rows[0] as BigScreenData;
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

  // Get TOP 3 DEFECTS
  async getTop3Defects(cd_linea: string): Promise<DefectData | null> {
    let connection: oracledb.Connection | undefined;
    console.log(`Querying Oracle DB for top 3 defects for line: ${cd_linea}`);
    try {
      connection = await connectToDB();
      const query = `SELECT Z21_DS_CAUSALE_RIPRESO, NO_DEFS, COLORID  
      FROM BIG_SCREEN_D4  WHERE CD_LINEA = :cd_linea AND RANK_OF_DEF<10 ORDER BY RANK_OF_DEF DESC`;

      const result = await connection.execute<DefectData>(query, [cd_linea], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });

      if (result.rows?.length) {
        return result.rows as DefectData;
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

  // Get TOP 4 LINE PRODUCTIVITY
  async getTop4Lines(): Promise<TopLineData | null> {
    let connection: oracledb.Connection | undefined;
    console.log(`Querying Oracle DB for top 4 lines`);
    try {
      connection = await connectToDB();
      const query = `SELECT CD_LINEA, CHECKED_QTY 
      FROM (
          SELECT CD_LINEA, CHECKED_QTY 
          FROM BIG_SCREEN_H 
          ORDER BY CHECKED_QTY DESC
      ) 
      WHERE ROWNUM <= 4`;
      const result = await connection.execute<TopLineData>(
        query,
        {},
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      if (result.rows?.length) {
        return result.rows as TopLineData;
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

  //Get OUTPUT AND PRODUCT KEY
  async getOutputAndKey(): Promise<OutputData[] | null> {
    let connection: oracledb.Connection | undefined;
    console.log("Querying Oracle DB for Output and Key");
    try {
      connection = await connectToDB();
      const query = `SELECT P40_CD_LINEA, P40_KEY_G22, P40_QTA_LAVORATA FROM (SELECT * FROM P40_RILEVAZIONI INNER JOIN Z02_FASI_DI_LAVORO 
        ON P40_CD_FASE = Z02_CODICE WHERE Z02_FLAG_STITCHING = 'O' 
         AND TRUNC(P40_DATA_ORA_F)=TRUNC (SYSDATE-48) 
           AND ROWNUM < 5 ORDER BY P40_DATA_ORA_F DESC)`;
      const result = await connection.execute<OutputData[]>(query, [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
      if (result.rows?.length) {
        return result.rows as unknown as OutputData[];
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

  async getOutputAndKeyLine(cd_linea: string): Promise<OutputData[] | null> {
    let connection: oracledb.Connection | undefined;
    console.log("Querying Oracle DB for Output and Key");
    try {
      connection = await connectToDB();
      const query = `SELECT P40_CD_LINEA, P40_KEY_G22, P40_QTA_LAVORATA FROM (SELECT * FROM P40_RILEVAZIONI INNER JOIN Z02_FASI_DI_LAVORO 
        ON P40_CD_FASE = Z02_CODICE WHERE Z02_FLAG_STITCHING = 'O' 
         AND TRUNC(P40_DATA_ORA_F)=TRUNC (SYSDATE-48) 
           AND ROWNUM < 5 ORDER BY P40_DATA_ORA_F DESC) where P40_CD_LINEA = :cd_linea`;
      const result = await connection.execute<OutputData[]>(query, [cd_linea], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
      if (result.rows?.length) {
        return result.rows as unknown as OutputData[];
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
