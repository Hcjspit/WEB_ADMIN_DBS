import { Server } from "socket.io";
import {
  handleRequestLineData,
  handleRequestOutputAndKey,
  handleRequestTop4Lines,
} from "./api/socket/dashboard/dashboard.controller";
import { handleRequestTableData } from "./api/socket/table/table.controller";
import { Socket } from "socket.io";

// Funzione asincrona per gestire le richieste iniziali
const handleInitialRequests = async (socket: Socket) => {
  //dashboard
  await handleRequestOutputAndKey(socket);
  await handleRequestTop4Lines(socket);
  //table
  await handleRequestTableData(socket);
};

//Metodo inizializzazione socket
export const initializeSocket = (io: Server) => {
  //Gestisce l'evento di connessione al server Socket
  io.on("connection", (socket: Socket) => {
    console.log("Client connected", socket.id);
    handleInitialRequests(socket);

    //Gestisce l'evento di disconnessione al server Socket
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    //Gestisce l'evento di richiesta di outandkey
    socket.on("requestOutputAndKeyData", async () => {
      await handleRequestOutputAndKey(socket);
    });

    //Gestisce l'evento di richiesta di top4line
    socket.on("requestTop4LinesData", async () => {
      await handleRequestTop4Lines(socket);
    });

    //Gestisce l'evento di richiesta dei dati e delega al controller
    socket.on("requestLineData", async (data) => {
      console.log("Received requestLineData:", data); //Log richiesta per n° linea
      await handleRequestLineData(socket, data);
    });

    // // Gestisce l'evento di richiesta dei dati per la tabella
    // socket.on("requestTableData", async () => {
    //   await handleRequestTableData(socket);
    // });
  });
};
