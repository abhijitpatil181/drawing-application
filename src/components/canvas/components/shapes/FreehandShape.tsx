import React from "react";
import { Line } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const FreehandShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  return (
    <Line
      points={tool.geometry.flatMap((p) => [p.x, p.y])}
      stroke={(tool.Properties as ShapeToolProperties).color}
      strokeWidth={parseInt(
        (tool.Properties as ShapeToolProperties).lineWidth,
        10
      )}
      tension={0.5}
      closed={false}
    />
  );
};

export default FreehandShape;
