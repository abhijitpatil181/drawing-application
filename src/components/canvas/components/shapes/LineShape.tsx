import React from "react";
import { Line } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const LineShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  const { geometry, Properties } = tool;
  return (
    <Line
      points={geometry.flatMap((p) => [p.x, p.y])}
      stroke={(Properties as ShapeToolProperties).color}
      strokeWidth={parseInt((Properties as ShapeToolProperties).lineWidth, 10)}
      draggable={true}
    />
  );
};

export default LineShape;
