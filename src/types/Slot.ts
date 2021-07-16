import { MutableRefObject } from "react";

export interface Symbol {
  ref: MutableRefObject<HTMLImageElement | null>;
  movingSymbolRef: MutableRefObject<HTMLImageElement | null>;
  value: string;
}

interface Slot extends Symbol {
  y: number;
  h: number;
  offset: number;
  isReplaced: boolean;
  isUsedToCalculateWin: boolean;
}

export default Slot;
