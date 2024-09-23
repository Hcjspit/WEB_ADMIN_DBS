import "reflect-metadata";
import app from "./app";
import { connectToDB } from "./dbConfig";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { initializeDashboardService } from "./api/socket/dashboard/dashboard.controller";
import { initializeSocket } from "./initializeSocket";
import { initializeTableService } from "./api/socket/table/table.controller";

dotenv.config();

const server = http.createServer(app);

//Creazione Server Socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Istanza dell'avvio
// Inizializzazione del socket una sola volta
initializeSocket(io);

// Inizializzazione dei servizi una sola volta
initializeDashboardService(io);
initializeTableService(io);

//Avvio del server
connectToDB()
  .then((_) => {
    console.log("Connected to Oracle database");
    const port = process.env.PORT;
    server.listen(port, () => {
      console.log(`Server connected on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
