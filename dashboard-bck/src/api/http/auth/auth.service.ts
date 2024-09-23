import jwt from "jsonwebtoken";
import { connectToDB } from "../../../dbConfig";
import { User } from "../user/user.entity";
import dotenv from "dotenv";
import OracleDB = require("oracledb");
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  let connection: OracleDB.Connection | undefined;
  try {
    connection = await connectToDB();
    const result = await connection.execute<User>(
      `SELECT  CD_UTENTE_BUT, DASHBOARD_PW FROM BUT_UTENTI WHERE CD_UTENTE_BUT= :email`,
      { email },
      { outFormat: OracleDB.OUT_FORMAT_OBJECT }
    );
    if (result.rows?.length) {
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.DASHBOARD_PW);
      if (isPasswordValid) {
        return user;
      } else {
        console.log("Password Invalid");
      }
    } else {
      console.log("User not found");
    }
    return null;
  } catch (err) {
    console.error("Database error: ", err);
    return null;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection", err);
      }
    }
  }
};

export const generateToken = (user: User) => {
  return jwt.sign({ sub: user.ID_UTENTE }, JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    console.log("Token verified:", decoded);

    return decoded;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
};
