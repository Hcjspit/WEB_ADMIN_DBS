import { Server, Socket } from "socket.io";
import { TableService } from "./table.service";
import { events } from "oracledb";

let tableService: TableService;

export const initializeTableService = (io: Server) => {
  if (!tableService) {
    tableService = new TableService(io);
  }
};

const handleError = (socket: Socket, error: any, event: string) => {
  console.error(`${event} error: `, error);
  socket.emit("error", { event, message: "Internal server error" });
};

export const handleRequestTableData = async (socket: Socket) => {
  try {
    if (!tableService) {
      throw new Error("TableService not initialized");
    }
    const smallTableData = await tableService.getSmallTableData();
    if (smallTableData) {
      console.log("SmallTableData found:", smallTableData),
        socket.emit("smallTableDataResponse", smallTableData);
    } else {
      socket.emit("error", {
        event: "smallTableResponse",
        message: "Data not found",
      });
    }

    const bigTableData = await tableService.getBigTableData();
    if (bigTableData) {
      console.log("BigTableData found:", bigTableData);
      socket.emit("bigTableDataResponse", bigTableData);
    } else {
      socket.emit("error", {
        event: "bigTableDataResponse",
        message: "Data not found",
      });
    }
  } catch (err) {
    handleError(socket, err, "smallTableData");
  }
};
