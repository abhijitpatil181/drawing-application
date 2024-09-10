import { ToolBarOptions } from "../types/drawingToolBar.type";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import PolylineOutlinedIcon from "@mui/icons-material/PolylineOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";

export const toolBarOption: ToolBarOptions[] = [
  {
    propertyName: "line",
    propertyIcon: HorizontalRuleOutlinedIcon,
  },
  {
    propertyName: "rectangle",
    propertyIcon: RectangleOutlinedIcon,
  },
  {
    propertyName: "circle",
    propertyIcon: CircleOutlinedIcon,
  },
  {
    propertyName: "polygon",
    propertyIcon: PolylineOutlinedIcon,
  },
  {
    propertyName: "brush",
    propertyIcon: BrushOutlinedIcon,
  },
  {
    propertyName: "text",
    propertyIcon: FormatColorTextOutlinedIcon,
  },
  {
    propertyName: "undo",
    propertyIcon: UndoOutlinedIcon,
  },
  {
    propertyName: "redo",
    propertyIcon: RedoOutlinedIcon,
  },
];
