import { ToolBaseInformation } from "../types/canvas.type";

export const isIntersecting = (
  shape: ToolBaseInformation,
  eraserRect: { x: number; y: number; width: number; height: number }
) => {
  const shapeBounds = {
    minX: Math.min(...shape.geometry.map((p) => p.x)),
    maxX: Math.max(...shape.geometry.map((p) => p.x)),
    minY: Math.min(...shape.geometry.map((p) => p.y)),
    maxY: Math.max(...shape.geometry.map((p) => p.y)),
  };

  return (
    shapeBounds.maxX > eraserRect.x &&
    shapeBounds.minX < eraserRect.x + eraserRect.width &&
    shapeBounds.maxY > eraserRect.y &&
    shapeBounds.minY < eraserRect.y + eraserRect.height
  );
};
