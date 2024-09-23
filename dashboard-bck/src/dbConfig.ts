import dotenv from "dotenv";
import oracledb from "oracledb";

dotenv.config();

//Inizializzo il Client
try {
  oracledb.initOracleClient();
} catch (err) {
  console.error("Error initializing Oracle client:", err);
}

//Dichiaro le variabili d'accesso
const user = process.env.DB_USER;
const pw = process.env.DB_PASSWORD;
const connectString = process.env.DB_CONNECT_STRING;

const dbCredential = {
  user: user,
  password: pw,
  connectString: connectString,
};

//Dichiaro il metodo per la connessione al DB
export async function connectToDB() {
  try {
    const connection = await oracledb.getConnection(dbCredential);
    return connection;
  } catch (err) {
    console.error("Error connecting to DB:", err);
    throw err;
  }
}
