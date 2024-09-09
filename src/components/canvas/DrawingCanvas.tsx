import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { ToolBaseInformation } from "../../types/canvas.type";
import {
  LineShape,
  CircleShape,
  RectangleShape,
  FreehandShape,
  TextShape,
  BlinkingCursor,
} from "./components";

import useDrawingContext from "../../hooks/useDrawing";
import EraserCursor from "./DrawingCanvas.styled";

const DrawingCanvas: React.FC = () => {
  const { activeTool, drawingData, setDrawingData } = useDrawingContext();
  const [currentTool, setCurrentTool] = useState<ToolBaseInformation | null>(
    null
  );
  const [drawing, setDrawing] = useState(false);
  const textMeasurementRef = useRef<HTMLCanvasElement | null>(null);
  const [eraserRect, setEraserRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Create a canvas element for measuring text
  const measureTextWidth = (
    text: string,
    fontSize: number,
    fontFamily: string
  ): number => {
    if (!textMeasurementRef.current) {
      textMeasurementRef.current = document.createElement("canvas");
    }
    const canvas = textMeasurementRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.font = `${fontSize}px ${fontFamily}`;
      return context.measureText(text).width;
    }
    return 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentTool && currentTool.type === "text") {
        let newText = currentTool.Properties.text || "";
        let cursorPosition = newText.length; // Default position to the end of the text

        switch (e.key) {
          case "Backspace":
            // Handle Backspace key to remove last character
            if (cursorPosition > 0) {
              newText =
                newText.slice(0, cursorPosition - 1) +
                newText.slice(cursorPosition);
              cursorPosition = Math.max(0, cursorPosition - 1);
            }
            break;
          case "Enter":
            // Handle Enter key to add a new line
            newText =
              newText.slice(0, cursorPosition) +
              "\n" +
              newText.slice(cursorPosition);
            cursorPosition += 1; // Move cursor to the position after the newline
            break;
          default:
            // Append new character to text if it's printable
            if (e.key.length === 1) {
              newText =
                newText.slice(0, cursorPosition) +
                e.key +
                newText.slice(cursorPosition);
              cursorPosition += 1;
            }
            break;
        }

        setCurrentTool({
          ...currentTool,
          Properties: {
            ...currentTool.Properties,
            text: newText,
            cursorPosition: cursorPosition,
          },
        });
      }
    };

    if (currentTool && currentTool.type === "text") {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [currentTool, drawingData]);

  const handleMouseDown = (e: any) => {
    const { x, y } = e.target.getStage().getPointerPosition();

    if (activeTool === "eraser") {
      setEraserRect({ x, y, width: 50, height: 50 }); // Set the initial size and position of the eraser
      setDrawing(true);
    } else {
      let newTool: ToolBaseInformation;

      switch (activeTool) {
        case "brush":
          newTool = {
            type: "brush",
            geometry: [{ x, y }],
            Properties: { color: "black", lineWidth: "2" },
          };
          break;
        case "polygon":
          newTool = {
            type: "polygon",
            geometry: [{ x, y }],
            Properties: { color: "black", lineWidth: "2" },
          };
          break;
        case "circle":
          newTool = {
            type: "circle",
            geometry: [
              { x, y },
              { x, y },
            ],
            Properties: { color: "black", lineWidth: "2" },
          };
          break;
        case "rectangle":
          newTool = {
            type: "rectangle",
            geometry: [
              { x, y },
              { x, y },
            ],
            Properties: { color: "black", lineWidth: "2" },
          };
          break;
        case "text":
          newTool = {
            type: "text",
            geometry: [{ x, y }],
            Properties: {
              color: "black",
              fontSize: "20",
              fontFamily: "Arial",
              text: "",
              cursorPosition: 0,
            },
          };
          break;
        default:
          newTool = {
            type: activeTool,
            geometry: [{ x, y }],
            Properties: { color: "black", lineWidth: "2" },
          };
          break;
      }

      setCurrentTool(newTool);
      setDrawing(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!drawing) return;

    const { x, y } = e.target.getStage().getPointerPosition();
    setCursorPosition({ x, y }); // Update cursor position

    if (activeTool === "eraser" && eraserRect) {
      setEraserRect({
        ...eraserRect,
        width: x - eraserRect.x,
        height: y - eraserRect.y,
      });
    } else if (currentTool) {
      let updatedTool: ToolBaseInformation;

      switch (activeTool) {
        case "brush":
        case "polygon":
          updatedTool = {
            ...currentTool,
            geometry: [...currentTool.geometry, { x, y }],
          };
          break;
        case "line":
        case "rectangle":
          updatedTool = {
            ...currentTool,
            geometry: [currentTool.geometry[0], { x, y }],
          };
          break;
        case "circle":
          updatedTool = {
            ...currentTool,
            geometry: [currentTool.geometry[0], { x, y }],
          };
          break;
        default:
          return;
      }

      setCurrentTool(updatedTool);
    }
  };

  const handleMouseUp = () => {
    if (activeTool === "eraser" && eraserRect) {
      // Erase shapes within the eraser rectangle
      const newDrawingData = drawingData.filter((tool) => {
        const { x, y, width, height } = eraserRect!;
        return !tool.geometry.some(
          (point) =>
            point.x >= x &&
            point.x <= x + width &&
            point.y >= y &&
            point.y <= y + height
        );
      });

      setDrawingData(newDrawingData);
      setEraserRect(null);
    } else if (currentTool && currentTool.type !== "text") {
      setDrawingData([...drawingData, currentTool]);
      setCurrentTool(null);
    }

    setDrawing(false);
  };

  const renderShape = (tool: ToolBaseInformation) => {
    switch (tool.type) {
      case "line":
        return <LineShape tool={tool} />;
      case "circle":
        return <CircleShape tool={tool} />;
      case "rectangle":
        return <RectangleShape tool={tool} />;
      case "polygon":
        return <></>;
      // return <PolygonShape tool={tool} />;
      case "brush":
        return <FreehandShape tool={tool} />;
      case "text": {
        const { x, y } = tool.geometry[0];
        const fontSize = parseInt(tool.Properties.fontSize || "20", 10);
        const fontFamily = tool.Properties.fontFamily || "Arial";
        const text = tool.Properties.text || "";
        const lines = text.split("\n");
        const cursorPosition = tool.Properties.cursorPosition || 0;

        let cursorX = x;
        let cursorY = y;

        let charIndex = 0;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (cursorPosition <= charIndex + line.length) {
            // Move cursor to the appropriate x and y position
            cursorX =
              x +
              measureTextWidth(
                line.slice(0, cursorPosition - charIndex),
                fontSize,
                fontFamily
              );
            cursorY = y + i * fontSize;
            break;
          }
          charIndex += line.length + 1; // +1 for newline character
        }

        return (
          <>
            <TextShape tool={tool} />
            <BlinkingCursor x={cursorX} y={cursorY} />
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {drawingData.map((tool, index) => (
            <React.Fragment key={index}>{renderShape(tool)}</React.Fragment>
          ))}
          {currentTool && renderShape(currentTool)}
          {eraserRect && <EraserCursor x={eraserRect.x} y={eraserRect.y} />}
          {cursorPosition && (
            <EraserCursor x={cursorPosition.x} y={cursorPosition.y} />
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default DrawingCanvas;
