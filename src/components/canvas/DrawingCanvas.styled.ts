// EraserCursor.tsx
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { eraser } from "../../assets";

interface EraserCursorProps {
  x: number;
  y: number;
}

const EraserCursor = styled(Box, {
  shouldForwardProp: (prop) => prop !== "x" && prop !== "y",
})<EraserCursorProps>(({ x, y }) => ({
  position: "absolute",
  left: x,
  top: y,
  width: "50px",
  height: "50px",
  backgroundImage: `url(${eraser})`, // Replace with your icon path
  backgroundSize: "cover",
  pointerEvents: "none",
  zIndex: 10,
}));

export default EraserCursor;
