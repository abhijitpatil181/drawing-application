import React from "react";
import { Rect } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const RectangleShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  const [start, end] = tool.geometry;
  const width = end.x - start.x;
  const height = end.y - start.y;
  return (
    <Rect
      x={start.x}
      y={start.y}
      width={width}
      height={height}
      stroke={(tool.Properties as ShapeToolProperties).color} // Border color
      strokeWidth={parseInt(
        (tool.Properties as ShapeToolProperties).lineWidth,
        10
      )}
    />
  );
};

export default RectangleShape;
