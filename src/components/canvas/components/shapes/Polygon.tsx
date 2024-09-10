import React from "react";
import { Line } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const Polygon: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  // Extracting points from tool.geometry
  const points = tool.geometry.flatMap((p) => [p.x, p.y]);

  // Extracting properties
  const properties = tool.Properties as ShapeToolProperties;
  const strokeColor = properties.color;
  const strokeWidth = parseInt(properties.lineWidth, 10);

  return (
    <Line points={points} stroke={strokeColor} strokeWidth={strokeWidth} />
  );
};

export default Polygon;
