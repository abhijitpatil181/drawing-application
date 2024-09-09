import React from "react";
// import { Polygon } from "react-konva";
import {
  ToolBaseInformation,
  ShapeToolProperties,
} from "../../../../types/canvas.type";

const PolygonShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  return (
    <>
      {/* <Polygon
        points={tool.geometry.flatMap((p) => [p.x, p.y])}
        stroke={(tool.Properties as ShapeToolProperties).color}
        strokeWidth={parseInt(
          (tool.Properties as ShapeToolProperties).lineWidth,
          10
        )}
      /> */}
    </>
  );
};

export default PolygonShape;
