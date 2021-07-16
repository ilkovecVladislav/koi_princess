import { MutableRefObject } from "react";

import Slot, { Symbol } from "types/Slot";
import WiningData from "types/WiningData";
import { getRandomSymbol } from "./base";
import {
  MOVEMENT_SPEED,
  SYMBOL_START_Y,
  SYMBOL_HEIGHT_AND_WIDTH,
  START_SYMBOL_X_POSITION,
  DISTANCE_BETWEEN_TWO_SYMBOLS,
} from "../constants/common";

interface DrawSymbols {
  ctx: CanvasRenderingContext2D;
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>;
  isRolling: MutableRefObject<boolean>;
  winingDataRef: MutableRefObject<WiningData | null>;
  symbols: MutableRefObject<Symbol[]>;
}

const Y_HIDE_POSITION = 425; // after it value we start hiding symbol
const NEW_CIRCLE_Y_POSITION = 1825; // after it value we start new circle(show replaced symbols)
const REPLACED_SYMBOL_Y_POSITION = 800; // after it value we replace the current symbol with new one

const drawSymbols = ({
  ctx,
  columns,
  winingDataRef,
  isRolling,
  symbols,
}: DrawSymbols): void => {
  ctx.save();
  columns.current.forEach((column, columnIndex) => {
    column.current.forEach((symbol) => {
      if (symbol.ref.current && symbol.movingSymbolRef.current) {
        if (
          !isRolling.current &&
          winingDataRef.current &&
          winingDataRef.current.totalPayout > 0
        ) {
          // set opacity if the player won
          ctx.globalAlpha = 0.5;
        }

        const drawingSymbol = isRolling.current
          ? symbol.movingSymbolRef.current
          : symbol.ref.current;
        const symbolX =
          START_SYMBOL_X_POSITION + DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex;

        if (symbol.y >= 0 && symbol.h < SYMBOL_HEIGHT_AND_WIDTH) {
          // show symbol that passed the circle
          ctx.drawImage(
            drawingSymbol,
            0,
            symbol.offset,
            SYMBOL_HEIGHT_AND_WIDTH,
            symbol.h,
            symbolX,
            symbol.y,
            SYMBOL_HEIGHT_AND_WIDTH,
            symbol.h
          );
        } else if (isRolling.current) {
          // show moving symbol
          ctx.drawImage(
            drawingSymbol,
            0,
            0,
            SYMBOL_HEIGHT_AND_WIDTH,
            symbol.h,
            symbolX,
            symbol.y,
            SYMBOL_HEIGHT_AND_WIDTH,
            symbol.h
          );
        } else if (!isRolling.current && symbol.y < Y_HIDE_POSITION) {
          // show symbol after rolling
          ctx.drawImage(
            drawingSymbol,
            0,
            0,
            SYMBOL_HEIGHT_AND_WIDTH,
            SYMBOL_HEIGHT_AND_WIDTH,
            symbolX,
            symbol.y,
            SYMBOL_HEIGHT_AND_WIDTH,
            SYMBOL_HEIGHT_AND_WIDTH
          );
        }

        if (isRolling.current) {
          // show symbol that passed the circle
          if (
            symbol.h < SYMBOL_HEIGHT_AND_WIDTH &&
            symbol.y === SYMBOL_START_Y
          ) {
            symbol.h += MOVEMENT_SPEED;
            symbol.offset -= MOVEMENT_SPEED;
          } else {
            // move symbol down
            symbol.y += MOVEMENT_SPEED;
          }

          // hide symbol when he is close to the column border
          if (symbol.y > Y_HIDE_POSITION) {
            symbol.h -= MOVEMENT_SPEED;
          }

          // replace symbol after it was hidden
          if (symbol.y > REPLACED_SYMBOL_Y_POSITION && !symbol.isReplaced) {
            const newSlot = getRandomSymbol(symbols);

            symbol.ref = newSlot.ref;
            symbol.value = newSlot.value;
            symbol.isReplaced = true;
          }

          // reset symbol parameters after the circle(reel) has passed
          if (symbol.y >= NEW_CIRCLE_Y_POSITION) {
            symbol.y = SYMBOL_START_Y;
            symbol.h = 0;
            symbol.offset = SYMBOL_HEIGHT_AND_WIDTH;
          }
        } else if (symbol.isReplaced) {
          symbol.isReplaced = false;
        }
      }
    });
  });

  ctx.restore();
};

export default drawSymbols;
