export interface Point {
  x: number;
  y: number;
}

export interface BaseToolProperties {
  color: string;
}

export interface ShapeToolProperties extends BaseToolProperties {
  lineWidth: string;
}

export interface TextToolProperty extends BaseToolProperties {
  fontSize: string;
  fontFamily: string;
  text: string;
  cursorPosition: number;
}

export interface ToolBaseInformation {
  type: string;
  geometry: Point[];
  Properties: ShapeToolProperties | TextToolProperty;
}
