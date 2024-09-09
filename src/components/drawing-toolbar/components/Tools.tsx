import { Stack, Tooltip } from "@mui/material";
import { toolBarOption } from "../../../mock/tools.mock";
import React from "react";
import { ToolBarWrapper, ToolBarButton } from "./Tools.styled";

import useDrawingContext from "../../../hooks/useDrawing";
import { eraser } from "../../../assets";

const Tools = () => {
  const { setActiveTool, activeTool, undo, redo, drawingData, history } =
    useDrawingContext();

  const onClickHandler = (toolName: string) => {
    if (toolName === "undo") {
      undo();
    } else if (toolName === "redo") {
      redo();
    } else {
      activeTool === toolName ? setActiveTool("") : setActiveTool(toolName);
    }
  };

  return (
    <>
      <ToolBarWrapper>
        <Stack
          flexDirection={"row"}
          rowGap={1}
          columnGap={2}
          padding={"0.5rem"}
          alignItems={"center"}
        >
          {toolBarOption.length > 0 &&
            toolBarOption.map((tool) => (
              <Tooltip key={tool.propertyName} title={tool.propertyName}>
                <ToolBarButton
                  onClick={() => onClickHandler(tool.propertyName)}
                  active={activeTool === tool.propertyName}
                  disabled={
                    (tool.propertyName === "undo" &&
                      drawingData.length === 0) ||
                    (tool.propertyName === "redo" && history.length === 0)
                  }
                >
                  {React.createElement(tool.propertyIcon)}
                </ToolBarButton>
              </Tooltip>
            ))}
          <Tooltip title={"eraser"}>
            <ToolBarButton
              onClick={() => onClickHandler("eraser")}
              active={activeTool === "eraser"}
            >
              <img src={eraser} alt="eraser" />
            </ToolBarButton>
          </Tooltip>
        </Stack>
      </ToolBarWrapper>
    </>
  );
};

export default Tools;
