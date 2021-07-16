import { MutableRefObject } from 'react';

export interface SlotSymbol {
  ref: MutableRefObject<HTMLImageElement | null>;
  movingSymbolRef: MutableRefObject<HTMLImageElement | null>;
  value: string;
}

interface Slot extends SlotSymbol {
  y: number;
  h: number;
  offset: number;
  isReplaced: boolean;
  isUsedToCalculateWin: boolean;
}

export default Slot;
