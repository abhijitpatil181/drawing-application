import { createContext } from "react";
import { Socket } from "socket.io-client";
import { ToolBaseInformation } from "../types/canvas.type";

export interface DrawingContextProps {
  socket: Socket | null;
  activeTool: string;
  setActiveTool: React.Dispatch<React.SetStateAction<string>>;
  drawingData: ToolBaseInformation[];
  setDrawingData: React.Dispatch<React.SetStateAction<ToolBaseInformation[]>>;
  history: ToolBaseInformation[];
  undo: () => void;
  redo: () => void;
}

export const DrawingContext = createContext<DrawingContextProps | undefined>(
  undefined
);
