import { MutableRefObject } from "react";
import forEach from "lodash/forEach";

import CombinationInfo from "types/CombinationInfo";

interface DrawCombination {
  ctx: CanvasRenderingContext2D;
  title: string;
  circleCoordinates: [number, number, number, number];
  titleCoordinates: [number, number];
  lineCoordinates: number[][];
  yellowCircleRef: MutableRefObject<HTMLImageElement | null>;
}

export const drawCombination = ({
  ctx,
  yellowCircleRef,
  title,
  circleCoordinates,
  titleCoordinates,
  lineCoordinates,
}: DrawCombination): void => {
  if (yellowCircleRef.current) {
    ctx.drawImage(yellowCircleRef.current, ...circleCoordinates);
    ctx.font = "16px serif";
    ctx.fillText(title, ...titleCoordinates);
    ctx.beginPath();
    lineCoordinates.forEach(([x, y], index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      }
      ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#feffd4";
    ctx.lineWidth = 6;
    ctx.stroke();
  }
};

interface Params {
  ctx: CanvasRenderingContext2D;
  combinationsHover: MutableRefObject<{
    [key: string]: CombinationInfo;
  }>;
  yellowCircleRef: MutableRefObject<HTMLImageElement | null>;
}

const drawCombinations = ({
  ctx,
  combinationsHover,
  yellowCircleRef,
}: Params): void => {
  forEach(
    combinationsHover.current,
    ({
      hover,
      title,
      circleCoordinates,
      titleCoordinates,
      lineCoordinates,
    }) => {
      if (hover) {
        drawCombination({
          ctx,
          yellowCircleRef,
          title,
          titleCoordinates,
          circleCoordinates,
          lineCoordinates,
        });
      }
    }
  );
};

export default drawCombinations;
