import { MutableRefObject } from "react";

interface Params {
  ctx: CanvasRenderingContext2D;
  columTopRef: MutableRefObject<HTMLImageElement | null>;
  columnBgRef: MutableRefObject<HTMLImageElement | null>;
  columBottomRef: MutableRefObject<HTMLImageElement | null>;
}

const TOTAL_COLUMNS = 5;
const COLUMN_START_X = 240;

const drawColumns = ({
  ctx,
  columnBgRef,
  columTopRef,
  columBottomRef,
}: Params) => {
  if (columnBgRef.current && columTopRef.current && columBottomRef.current) {
    for (let i = 0; i < TOTAL_COLUMNS; i += 1) {
      const offset = i > 0 ? 5 : 0;
      ctx.drawImage(
        columnBgRef.current,
        COLUMN_START_X + columnBgRef.current.width * i - offset * i,
        50
      );
      ctx.drawImage(
        columTopRef.current,
        COLUMN_START_X + columnBgRef.current.width * i - offset * i,
        30
      );
      ctx.drawImage(
        columBottomRef.current,
        COLUMN_START_X + columnBgRef.current.width * i - offset * i,
        columnBgRef.current.height + 15
      );
    }
  }
};

export default drawColumns;
