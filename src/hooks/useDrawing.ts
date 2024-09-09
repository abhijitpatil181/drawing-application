import { useContext } from "react";
import { DrawingContext } from "../context/DrawingContext";

const useDrawingContext = () => {
  const context = useContext(DrawingContext);

  if (!context) {
    throw new Error("useDrawingContext must be used within a DrawingProvider");
  }

  return context;
};

export default useDrawingContext;
