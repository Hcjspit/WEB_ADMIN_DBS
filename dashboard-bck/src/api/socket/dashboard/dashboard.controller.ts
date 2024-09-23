import { Server, Socket } from "socket.io";
import { DashboardService } from "./dashboard.service";

let dashboardService: DashboardService;

export const initializeDashboardService = (io: Server) => {
  if (!dashboardService) {
    dashboardService = new DashboardService(io);
  }
};

const handleError = (socket: Socket, error: any, event: string) => {
  console.error(`${event} error: `, error);
  socket.emit("error", { event, message: "Internal server error" });
};

export const handleRequestLineData = async (
  socket: Socket,
  { cd_linea }: { cd_linea: string }
) => {
  try {
    console.log(`Fetching data for line: ${cd_linea}`);
    const allData = await dashboardService.getDataFromOracleDB(cd_linea);
    if (allData) {
      console.log("Data found: ", allData);
      socket.emit("allDataResponse", allData);
    } else {
      socket.emit("error", {
        event: "allDataResponse",
        message: "Data not found",
      });
    }

    const top3Defects = await dashboardService.getTop3Defects(cd_linea);
    if (top3Defects) {
      console.log("Top 3 defects found: ", top3Defects);
      socket.emit("top3DefectsResponse", top3Defects);
    } else {
      socket.emit("error", {
        event: "top3DefectsResponse",
        message: "Data not found",
      });
    }

    const outputAndKeyLine = await dashboardService.getOutputAndKeyLine(
      cd_linea
    );
    if (outputAndKeyLine) {
      console.log("Output and Key for Line Found: ", outputAndKeyLine);
      socket.emit("outputAndKeyLineResponse", outputAndKeyLine);
    } else {
      socket.emit("error", {
        event: "outputAndKeyLineResponse",
        message: "Data not found",
      });
    }

    const outputAndKey = await dashboardService.getOutputAndKey();
    if (outputAndKey) {
      console.log("Output and Key found: ", outputAndKey);
      socket.emit("outputAndKeyResponse", outputAndKey);
    } else {
      socket.emit("error", {
        event: "outputAndKeyResponse",
        message: "Data not found",
      });
    }
  } catch (err) {
    handleError(socket, err, "requestLineData");
  }
};

export const handleRequestTop4Lines = async (socket: Socket) => {
  try {
    const top4Lines = await dashboardService.getTop4Lines();
    if (top4Lines) {
      console.log("Top 4 lines found: ", top4Lines);
      socket.emit("top4LineResponse", top4Lines);
    } else {
      socket.emit("error", {
        event: "top4LineResponse",
        message: "Data not found",
      });
    }
  } catch (err) {
    handleError(socket, err, "top4Lines");
  }
};

export const handleRequestOutputAndKey = async (socket: Socket) => {
  try {
    const outputAndKey = await dashboardService.getOutputAndKey();
    if (outputAndKey) {
      console.log("Output and Key found: ", outputAndKey);
      socket.emit("outputAndKeyResponse", outputAndKey);
    } else {
      socket.emit("error", {
        event: "outputAndKeyResponse",
        message: "Data not found",
      });
    }
  } catch (err) {
    handleError(socket, err, "outputAndKey");
  }
};
