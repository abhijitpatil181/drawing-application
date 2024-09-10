import React, { useEffect, useState } from "react";
import { DrawingCanvas, DrawingToolBar } from "./components";

import useWebSocket from "./hooks/useWebSocket";
import { ToolBaseInformation } from "./types/canvas.type";
import { DrawingContext, DrawingContextProps } from "./context/DrawingContext";
import { eraser } from "./assets";

const App: React.FC = () => {
  const { socket } = useWebSocket("http://localhost:5005");
  const [activeTool, setActiveTool] = useState<string>("");
  const [drawingData, setDrawingData] = useState<ToolBaseInformation[]>([]);
  const [history, setHistory] = useState<ToolBaseInformation[]>([]);
  console.log("drawingData", drawingData);

  useEffect(() => {
    if (socket)
      socket.on("drawingData", (data) => {
        console.log("Received drawing data:", data);
        setDrawingData(data); // Update your state with new drawing data
      });
  }, []);

  useEffect(() => {
    if (socket && drawingData.length > 0) {
      socket.emit("drawingData", { type: "update", payload: drawingData });
    }
  }, [drawingData, socket]);

  // Undo functionality
  const undo = () => {
    if (drawingData.length > 0) {
      const newHistory = [...history, drawingData[drawingData.length - 1]];
      const newDrawingData = drawingData.slice(0, drawingData.length - 1);
      setDrawingData(newDrawingData);
      setHistory(newHistory);
    }
  };

  // Redo functionality
  const redo = () => {
    if (history.length > 0) {
      const lastHistoryItem = history[history.length - 1];
      const newDrawingData = [...drawingData, lastHistoryItem];
      const newHistory = history.slice(0, history.length - 1);
      setDrawingData(newDrawingData);
      setHistory(newHistory);
    }
  };

  const values: DrawingContextProps = {
    socket,
    activeTool,
    setActiveTool,
    drawingData,
    setDrawingData,
    history,
    undo,
    redo,
  };

  return (
    <>
      <DrawingContext.Provider value={{ ...values }}>
        <DrawingToolBar />
        <DrawingCanvas />
      </DrawingContext.Provider>
    </>
  );
};

export default App;
