import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

interface ToolBarButtonProps {
  active: boolean;
}

export const ToolBarButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<ToolBarButtonProps>(({ active }) => ({
  height: "95%",
  width: "2rem",
  minWidth: 0,
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  backgroundColor: active ? "#d0c9f4" : "transparent", // Active color
  ":hover": {
    backgroundColor: active ? "#b0a3e1" : "#e0dfff", // Light purple color on hover, different if active
  },
}));

export const ToolBarWrapper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "38%",
  top: "1.5rem",
  boxShadow: theme.shadows[5],
  zIndex: 1000,
}));
