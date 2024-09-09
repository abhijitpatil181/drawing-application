import { useEffect, useState } from "react";
import { Text } from "react-konva";

const BlinkingCursor: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500); // Blinks every 500ms

    return () => clearInterval(interval);
  }, []);

  return visible ? (
    <Text x={x} y={y} text="|" fontSize={20} fontFamily="Arial" fill="black" />
  ) : null;
};

export default BlinkingCursor;
