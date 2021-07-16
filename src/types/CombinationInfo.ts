interface CombinationInfo {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  hover: boolean;
  title: string;
  combination: [number, number, number, number, number];
  circleCoordinates: [number, number, number, number];
  titleCoordinates: [number, number];
  lineCoordinates: number[][];
}

export default CombinationInfo;
