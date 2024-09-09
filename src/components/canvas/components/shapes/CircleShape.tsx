import React from "react";
import { Circle } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const CircleShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  const [center, edge] = tool.geometry;
  const radius = Math.sqrt(
    Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2)
  );
  return (
    <Circle
      x={center.x}
      y={center.y}
      radius={radius}
      stroke={(tool.Properties as ShapeToolProperties).color} // Border color
      strokeWidth={parseInt(
        (tool.Properties as ShapeToolProperties).lineWidth,
        10
      )}
    />
  );
};

export default CircleShape;
