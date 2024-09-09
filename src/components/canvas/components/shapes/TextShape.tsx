import React from "react";
import { Text } from "react-konva";
import {
  ToolBaseInformation,
  TextToolProperty,
} from "../../../../types/canvas.type";

const TextShape: React.FC<{ tool: ToolBaseInformation }> = ({ tool }) => {
  const [start] = tool.geometry;

  return (
    <Text
      x={start.x}
      y={start.y}
      text={(tool.Properties as TextToolProperty).text}
      fontSize={parseInt((tool.Properties as TextToolProperty).fontSize, 10)}
      fontFamily={(tool.Properties as TextToolProperty).fontFamily}
      fill={(tool.Properties as TextToolProperty).color}
      draggable={true} // Make the text draggable
    />
  );
};

export default TextShape;
