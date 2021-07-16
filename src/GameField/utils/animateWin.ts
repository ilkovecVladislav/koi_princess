import { MutableRefObject } from "react";

import Slot from "types/Slot";
import WiningData from "types/WiningData";
import { drawCombination } from "./drawCombinations";
import combinationsData from "../data/combinationsData";
import {
  SYMBOL_HEIGHT_AND_WIDTH,
  START_SYMBOL_X_POSITION,
  DISTANCE_BETWEEN_TWO_SYMBOLS,
  SHOW_WIN_COMBINATION_TIME,
} from "../constants/common";

const easeOutQuad = (t: number): number => t * (2 - t);
const frameDuration = 1000 / 60;
const totalFrames = Math.round(1500 / frameDuration);

interface AnimateWinInfoBarParams {
  ctx: CanvasRenderingContext2D;
  infoBarImgRef: MutableRefObject<HTMLImageElement | null>;
  frameRef: MutableRefObject<number>;
  isRolling: MutableRefObject<boolean>;
  totalWinHideDelay: MutableRefObject<number>;
  winingDataRef: MutableRefObject<WiningData | null>;
}

export const showTotalWiningInfoBar = ({
  ctx,
  frameRef,
  infoBarImgRef,
  isRolling,
  winingDataRef,
  totalWinHideDelay,
}: AnimateWinInfoBarParams): void => {
  if (infoBarImgRef.current && !isRolling.current && winingDataRef.current) {
    if (
      winingDataRef.current.totalPayout > 0 &&
      totalWinHideDelay.current > 0
    ) {
      // draw win coins bar
      ctx.drawImage(infoBarImgRef.current, 545, 550, 280, 60);
      if (frameRef.current !== totalFrames) {
        frameRef.current += 1;
        const progress = easeOutQuad(frameRef.current / totalFrames);
        ctx.save();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(
          `${Math.floor(winingDataRef.current.totalPayout * progress)}`,
          670,
          585
        );
        ctx.restore();
      } else if (frameRef.current === totalFrames) {
        ctx.save();
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`${winingDataRef.current.totalPayout}`, 670, 585);
        ctx.restore();
        totalWinHideDelay.current -= 1;
      }
    }
  }
};

interface ShowAllWinCombinationParams {
  ctx: CanvasRenderingContext2D;
  isRolling: MutableRefObject<boolean>;
  winingDataRef: MutableRefObject<WiningData | null>;
  totalWinHideDelay: MutableRefObject<number>;
  yellowCircleRef: MutableRefObject<HTMLImageElement | null>;
}

export const showAllWiningCombinations = ({
  ctx,
  yellowCircleRef,
  isRolling,
  winingDataRef,
  totalWinHideDelay,
}: ShowAllWinCombinationParams): void => {
  if (
    !isRolling.current &&
    winingDataRef.current &&
    winingDataRef.current.totalPayout > 0 &&
    totalWinHideDelay.current > 0
  ) {
    winingDataRef.current.payouts.forEach(({ combinationName }) => {
      if (combinationName) {
        const combination = combinationsData[combinationName];
        if (combination) {
          const {
            title,
            titleCoordinates,
            lineCoordinates,
            circleCoordinates,
          } = combination;
          drawCombination({
            ctx,
            title,
            titleCoordinates,
            lineCoordinates,
            circleCoordinates,
            yellowCircleRef,
          });
        }
      }
    });
  }
};

interface ShowWinCombination {
  ctx: CanvasRenderingContext2D;
  isRolling: MutableRefObject<boolean>;
  winingDataRef: MutableRefObject<WiningData | null>;
  totalWinHideDelay: MutableRefObject<number>;
  showWinCombinationTime: MutableRefObject<number>;
  currentShownWinCombinationIndex: MutableRefObject<number>;
  yellowCircleRef: MutableRefObject<HTMLImageElement | null>;
}

export const showWiningCombination = ({
  ctx,
  yellowCircleRef,
  isRolling,
  winingDataRef,
  totalWinHideDelay,
  showWinCombinationTime,
  currentShownWinCombinationIndex,
}: ShowWinCombination): void => {
  if (
    !isRolling.current &&
    winingDataRef.current &&
    winingDataRef.current.totalPayout > 0 &&
    totalWinHideDelay.current === 0
  ) {
    const { payouts } = winingDataRef.current;
    const { combinationName } =
      payouts[currentShownWinCombinationIndex.current];
    const combination = combinationsData[combinationName];
    if (payouts.length === 1) {
      if (combination) {
        const { title, titleCoordinates, lineCoordinates, circleCoordinates } =
          combination;
        drawCombination({
          ctx,
          title,
          titleCoordinates,
          lineCoordinates,
          circleCoordinates,
          yellowCircleRef,
        });
      }
    } else if (
      showWinCombinationTime.current > 0 &&
      currentShownWinCombinationIndex.current < payouts.length
    ) {
      if (combination) {
        const { title, titleCoordinates, lineCoordinates, circleCoordinates } =
          combination;
        drawCombination({
          ctx,
          title,
          titleCoordinates,
          lineCoordinates,
          circleCoordinates,
          yellowCircleRef,
        });
      }
      showWinCombinationTime.current -= 1;
    } else if (
      showWinCombinationTime.current <= 0 &&
      currentShownWinCombinationIndex.current < payouts.length - 1
    ) {
      showWinCombinationTime.current = SHOW_WIN_COMBINATION_TIME;
      currentShownWinCombinationIndex.current += 1;
    } else if (currentShownWinCombinationIndex.current === payouts.length - 1) {
      showWinCombinationTime.current = SHOW_WIN_COMBINATION_TIME;
      currentShownWinCombinationIndex.current = 0;
    }
  }
};

interface ShowAllWiningSlots {
  ctx: CanvasRenderingContext2D;
  winingDataRef: MutableRefObject<WiningData | null>;
  isRolling: MutableRefObject<boolean>;
  totalWinHideDelay: MutableRefObject<number>;
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>;
}

export const showAllWiningSlots = ({
  ctx,
  winingDataRef,
  isRolling,
  columns,
  totalWinHideDelay,
}: ShowAllWiningSlots): void => {
  if (
    !isRolling.current &&
    winingDataRef.current &&
    winingDataRef.current.totalPayout > 0 &&
    totalWinHideDelay.current > 0
  ) {
    const slotsByCombination: number[][] = winingDataRef.current.payouts.map(
      ({ combinationName, amount }) => {
        const { combination } = combinationsData[combinationName];
        return combination.slice(0, amount);
      }
    );
    const combinedSlotsByColumns = [[], [], [], [], []];
    for (let i = 0; i < 5; i += 1) {
      slotsByCombination.forEach((item) => {
        const slot = item[i];
        const column: number[] = combinedSlotsByColumns[i];
        if (slot >= 0 && !column.includes(slot)) {
          column.push(slot);
        }
      });
    }
    const allVisibleSlots = columns.current.map((column) =>
      column.current.filter(({ isUsedToCalculateWin }) => isUsedToCalculateWin)
    );

    combinedSlotsByColumns.forEach((column, columnIndex) => {
      column.forEach((slotIndex) => {
        const slot = allVisibleSlots[columnIndex][slotIndex];
        if (slot.ref.current) {
          ctx.drawImage(
            slot.ref.current,
            0,
            0,
            SYMBOL_HEIGHT_AND_WIDTH,
            SYMBOL_HEIGHT_AND_WIDTH,
            START_SYMBOL_X_POSITION +
              DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex,
            slot.y,
            SYMBOL_HEIGHT_AND_WIDTH,
            SYMBOL_HEIGHT_AND_WIDTH
          );
        }
      });
    });
  }
};

interface ShowWiningNumber {
  ctx: CanvasRenderingContext2D;
  payout: number;
  slotY: number;
  slotX: number;
  winCombinationNumbersRef: MutableRefObject<HTMLImageElement | null>;
}

const showWiningNumber = ({
  ctx,
  payout,
  winCombinationNumbersRef,
  slotY,
  slotX,
}: ShowWiningNumber): void => {
  if (winCombinationNumbersRef.current) {
    const payoutNumberXOffset = 55 * payout;
    ctx.drawImage(
      winCombinationNumbersRef.current,
      payoutNumberXOffset,
      0,
      55,
      182,
      slotX,
      slotY,
      40,
      150
    );
  }
};

interface ShowCombinationPayout {
  ctx: CanvasRenderingContext2D;
  payout: number;
  slot: Slot;
  columnIndex: number;
  amount: number;
  winCombinationNumbersRef: MutableRefObject<HTMLImageElement | null>;
}

const showCombinationPayout = ({
  ctx,
  amount,
  payout,
  winCombinationNumbersRef,
  slot,
  columnIndex,
}: ShowCombinationPayout): void => {
  if (
    (amount === 2 && columnIndex === 1) ||
    (amount > 2 && columnIndex === 2)
  ) {
    if (payout < 10) {
      showWiningNumber({
        ctx,
        winCombinationNumbersRef,
        payout,
        slotY: slot.y + 40,
        slotX:
          START_SYMBOL_X_POSITION +
          DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex +
          55,
      });
    } else if (payout >= 10 && payout < 100) {
      const convertedPayout = payout.toString().split("");
      convertedPayout.forEach((item, index) => {
        showWiningNumber({
          ctx,
          winCombinationNumbersRef,
          payout: Number(item),
          slotY: slot.y + 40,
          slotX:
            START_SYMBOL_X_POSITION +
            DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex +
            50 +
            40 * index,
        });
      });
    } else if (payout >= 100 && payout < 1000) {
      const convertedPayout = payout.toString().split("");
      convertedPayout.forEach((item, index) => {
        showWiningNumber({
          ctx,
          winCombinationNumbersRef,
          payout: Number(item),
          slotY: slot.y + 40,
          slotX:
            START_SYMBOL_X_POSITION +
            DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex +
            30 +
            40 * index,
        });
      });
    } else {
      const convertedPayout = payout.toString().split("");
      convertedPayout.forEach((item, index) => {
        showWiningNumber({
          ctx,
          winCombinationNumbersRef,
          payout: Number(item),
          slotY: slot.y + 40,
          slotX:
            START_SYMBOL_X_POSITION +
            DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex +
            40 * index,
        });
      });
    }
  }
};

interface ShowWiningCombinationSlots {
  ctx: CanvasRenderingContext2D;
  winingDataRef: MutableRefObject<WiningData | null>;
  isRolling: MutableRefObject<boolean>;
  totalWinHideDelay: MutableRefObject<number>;
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>;
  currentShownWinCombinationIndex: MutableRefObject<number>;
  winCombinationNumbersRef: MutableRefObject<HTMLImageElement | null>;
}

export const showWiningCombinationSlots = ({
  ctx,
  winingDataRef,
  isRolling,
  columns,
  totalWinHideDelay,
  currentShownWinCombinationIndex,
  winCombinationNumbersRef,
}: ShowWiningCombinationSlots): void => {
  if (
    !isRolling.current &&
    winingDataRef.current &&
    winingDataRef.current.totalPayout > 0 &&
    totalWinHideDelay.current === 0
  ) {
    const { payouts } = winingDataRef.current;
    const { combinationName, amount, payout } =
      payouts[currentShownWinCombinationIndex.current];
    const { combination } = combinationsData[combinationName];

    const winingCombination = combination.slice(0, amount);

    const allVisibleSlots = columns.current.map((column) =>
      column.current.filter(({ isUsedToCalculateWin }) => isUsedToCalculateWin)
    );
    winingCombination.forEach((rowIndex, columnIndex) => {
      const slot = allVisibleSlots[columnIndex][rowIndex];
      if (slot.ref.current) {
        ctx.drawImage(
          slot.ref.current,
          0,
          0,
          SYMBOL_HEIGHT_AND_WIDTH,
          SYMBOL_HEIGHT_AND_WIDTH,
          START_SYMBOL_X_POSITION + DISTANCE_BETWEEN_TWO_SYMBOLS * columnIndex,
          slot.y,
          SYMBOL_HEIGHT_AND_WIDTH,
          SYMBOL_HEIGHT_AND_WIDTH
        );
      }
      showCombinationPayout({
        ctx,
        winCombinationNumbersRef,
        slot,
        payout,
        columnIndex,
        amount,
      });
    });
  }
};
