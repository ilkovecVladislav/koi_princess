import { MutableRefObject, SetStateAction } from 'react';
import random from 'lodash/random';

import Slot, { SlotSymbol } from 'types/Slot';
import WiningData from 'types/WiningData';
import calculateWin from './calculateWin';
import {
  BASE_BET_VALUE,
  COIN_VALUES,
  MOVEMENT_SPEED,
  SYMBOL_START_Y,
  SYMBOL_HEIGHT_AND_WIDTH,
  ROLLING_DISTANCE,
  SHOW_WIN_COMBINATION_TIME,
  TOTAL_WIN_HIDE_DELAY,
  NUMBER_OF_ALL_IMAGES,
} from '../constants/common';

const TOTAL_SLOTS_BY_COLUMN = 12;

export const loadImage = (
  src: string,
  ref: MutableRefObject<HTMLImageElement | null>,
  numberOfUploadedImages: MutableRefObject<number>,
  ...rest: number[]
): void => {
  const image = new Image(...rest);
  image.onload = () => {
    ref.current = image;
    numberOfUploadedImages.current += 1;
  };
  image.src = src;
};

interface LoadingProgressParams {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  numberOfUploadedImages: MutableRefObject<number>;
}

export const handleLoadingProgress = ({
  ctx,
  canvas,
  numberOfUploadedImages,
}: LoadingProgressParams): void => {
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const fullRectWidth = 400;
  const rectStartX = canvas.width / 2 - fullRectWidth / 2;
  const percentageOfUploadedImages = (numberOfUploadedImages.current * 100) / NUMBER_OF_ALL_IMAGES;
  const loadingProgress = (percentageOfUploadedImages * fullRectWidth) / 100;

  ctx.rect(rectStartX, canvas.height / 2, fullRectWidth, 10);
  ctx.fillStyle = 'white';
  ctx.fillRect(rectStartX, canvas.height / 2, fullRectWidth, 10);

  ctx.rect(rectStartX, canvas.height / 2, loadingProgress, 10);
  ctx.fillStyle = 'green';
  ctx.fillRect(rectStartX, canvas.height / 2, loadingProgress, 10);
  ctx.restore();
};

export const getRandomSymbol = (
  symbols: MutableRefObject<SlotSymbol[]>,
  index?: number,
): SlotSymbol => {
  const randomValue = random(0, 9);

  return symbols.current[index || randomValue];
};

export const generateColumnSlots = (symbols: MutableRefObject<SlotSymbol[]>): Slot[] => {
  const result: Slot[] = [];
  for (let i = 0; i < TOTAL_SLOTS_BY_COLUMN; i += 1) {
    const randomSymbol = getRandomSymbol(symbols);
    const slot = {
      ...randomSymbol,
      y: SYMBOL_START_Y + SYMBOL_HEIGHT_AND_WIDTH * i,
      h: SYMBOL_HEIGHT_AND_WIDTH,
      offset: 0,
      isUsedToCalculateWin: false,
      isReplaced: false,
    };
    if (i > 2) {
      slot.h = 0;
    }

    if (i <= 2) {
      slot.isUsedToCalculateWin = true;
    }

    result.push(slot);
  }

  return result;
};

export const calculateBet = (betLevel: number, coinValueIndex: number): number =>
  BASE_BET_VALUE * betLevel * COIN_VALUES[coinValueIndex];

interface RollingParams {
  currentDistance: MutableRefObject<number>;
  isRolling: MutableRefObject<boolean>;
  coinValueRef: MutableRefObject<number>;
  winingDataRef: MutableRefObject<WiningData | null>;
  setCash: (value: SetStateAction<number>) => void;
  setWin: (value: SetStateAction<number>) => void;
}
export const handleRolling = ({
  currentDistance,
  isRolling,
  winingDataRef,
  coinValueRef,
  setCash,
  setWin,
}: RollingParams): void => {
  if (currentDistance.current === ROLLING_DISTANCE && isRolling.current) {
    isRolling.current = false;
    currentDistance.current = 0;
    if (winingDataRef.current && winingDataRef.current.totalPayout > 0) {
      const payout = winingDataRef.current.totalPayout * COIN_VALUES[coinValueRef.current];
      setCash((prevValue) => prevValue + payout);
      setWin(payout);
    }
  }

  if (isRolling.current) {
    currentDistance.current += MOVEMENT_SPEED;
  }
};

interface SpinButtonClickedParams {
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>;
  betLevelRef: MutableRefObject<number>;
  currentShownWinCombinationIndex: MutableRefObject<number>;
  showWinCombinationTime: MutableRefObject<number>;
  frameRef: MutableRefObject<number>;
  totalWinHideDelay: MutableRefObject<number>;
  isRolling: MutableRefObject<boolean>;
  coinValueRef: MutableRefObject<number>;
  winingDataRef: MutableRefObject<WiningData | null>;
  setCash: (value: SetStateAction<number>) => void;
  setWin: (value: SetStateAction<number>) => void;
}

export const handleSpinClicked = ({
  columns,
  betLevelRef,
  totalWinHideDelay,
  currentShownWinCombinationIndex,
  showWinCombinationTime,
  frameRef,
  coinValueRef,
  winingDataRef,
  isRolling,
  setWin,
  setCash,
}: SpinButtonClickedParams): void => {
  setWin(0);
  isRolling.current = true;
  winingDataRef.current = null;
  frameRef.current = 0;
  showWinCombinationTime.current = SHOW_WIN_COMBINATION_TIME;
  currentShownWinCombinationIndex.current = 0;
  totalWinHideDelay.current = TOTAL_WIN_HIDE_DELAY;
  setCash((prevValue) => {
    const bet = calculateBet(betLevelRef.current, coinValueRef.current);

    return prevValue - bet;
  });
  calculateWin(columns, betLevelRef.current).then((response) => {
    winingDataRef.current = response;
  });
};
