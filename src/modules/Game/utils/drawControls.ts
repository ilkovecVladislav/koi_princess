import { MutableRefObject } from 'react';

import { BASE_BET_VALUE, COIN_VALUES, MAX_BET_LEVEL, MIN_BET_LEVEL } from '../constants/common';
import {
  SPIN_BUTTON,
  MAX_BET_BUTTON,
  BET_LEVEL_LEFT_BUTTON,
  BET_LEVEL_RIGHT_BUTTON,
  COIN_VALUE_LEFT_BUTTON,
  COIN_VALUE_RIGHT_BUTTON,
} from '../constants/controlsCoordinates';

interface DrawImageParams {
  ctx: CanvasRenderingContext2D;
  imageRef: MutableRefObject<HTMLImageElement | null>;
  params: [number, number, number, number];
}

const drawImage = ({ ctx, imageRef, params }: DrawImageParams): void => {
  if (imageRef.current) {
    ctx.drawImage(imageRef.current, ...params);
  }
};

interface DrawSpinButtonParams {
  ctx: CanvasRenderingContext2D;
  spinBtnRef: MutableRefObject<HTMLImageElement | null>;
  spinActiveBtnRef: MutableRefObject<HTMLImageElement | null>;
  spinDisabledBtnRef: MutableRefObject<HTMLImageElement | null>;
  isRolling: MutableRefObject<boolean>;
  isControlsHover: MutableRefObject<{
    [key: string]: boolean;
  }>;
}

export const drawSpinButton = ({
  ctx,
  spinBtnRef,
  isRolling,
  isControlsHover,
  spinActiveBtnRef,
  spinDisabledBtnRef,
}: DrawSpinButtonParams): void => {
  if (!isRolling.current && !isControlsHover.current.spinButton) {
    drawImage({
      ctx,
      imageRef: spinBtnRef,
      params: [SPIN_BUTTON.x, SPIN_BUTTON.y, SPIN_BUTTON.w, SPIN_BUTTON.h],
    });
  } else if (spinActiveBtnRef.current && !isRolling.current && isControlsHover.current.spinButton) {
    drawImage({
      ctx,
      imageRef: spinActiveBtnRef,
      params: [SPIN_BUTTON.x, SPIN_BUTTON.y, SPIN_BUTTON.w, SPIN_BUTTON.h],
    });
  } else if (spinDisabledBtnRef.current && isRolling.current) {
    drawImage({
      ctx,
      imageRef: spinDisabledBtnRef,
      params: [SPIN_BUTTON.x, SPIN_BUTTON.y, SPIN_BUTTON.w, SPIN_BUTTON.h],
    });
  }
};

interface BetValueParams {
  ctx: CanvasRenderingContext2D;
  infoBarImgRef: MutableRefObject<HTMLImageElement | null>;
  betLevelRef: MutableRefObject<number>;
}

export const drawBetValueInfoBar = ({ ctx, infoBarImgRef, betLevelRef }: BetValueParams): void => {
  if (infoBarImgRef.current) {
    ctx.drawImage(infoBarImgRef.current, 280, 634, 100, 45);
    ctx.save();
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = 'white';
    const textX = betLevelRef.current >= 5 ? 320 : 323;
    ctx.fillText(`${BASE_BET_VALUE * betLevelRef.current}`, textX, 660);
    ctx.restore();
    ctx.save();
    ctx.font = '12px sans-serif';
    ctx.fillText('BET', 318, 634);
    ctx.restore();
  }
};

interface BetLevelInfoBarParams {
  ctx: CanvasRenderingContext2D;
  greenLineRef: MutableRefObject<HTMLImageElement | null>;
  infoBarWithControlsImgRef: MutableRefObject<HTMLImageElement | null>;
  betLevelRef: MutableRefObject<number>;
}

export const drawBetLevelInfoBar = ({
  ctx,
  greenLineRef,
  infoBarWithControlsImgRef,
  betLevelRef,
}: BetLevelInfoBarParams): void => {
  if (infoBarWithControlsImgRef.current && greenLineRef.current) {
    ctx.drawImage(infoBarWithControlsImgRef.current, 410, 636, 120, 40);
    ctx.drawImage(greenLineRef.current, 440, 665, 6 * betLevelRef.current, 4);
    ctx.save();
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = 'white';
    const textX = betLevelRef.current === 10 ? 460 : 466;
    ctx.fillText(`${betLevelRef.current}`, textX, 658);
    ctx.restore();
    ctx.save();
    ctx.font = '12px sans-serif';
    ctx.fillText('LEVEL', 450, 634);
    ctx.restore();
  }
};

interface BetLevelInfoBarControlsParams {
  ctx: CanvasRenderingContext2D;
  rightAngleBtnDisabledRef: MutableRefObject<HTMLImageElement | null>;
  rightAngleBtnHoverRef: MutableRefObject<HTMLImageElement | null>;
  rightAngleBtnRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnDisabledRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnHoverRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnRef: MutableRefObject<HTMLImageElement | null>;
  betLevelRef: MutableRefObject<number>;
  isRolling: MutableRefObject<boolean>;
  isControlsHover: MutableRefObject<{
    [key: string]: boolean;
  }>;
}

export const drawBetLevelInfoBarControls = ({
  ctx,
  rightAngleBtnDisabledRef,
  rightAngleBtnHoverRef,
  rightAngleBtnRef,
  leftAngleBtnDisabledRef,
  leftAngleBtnHoverRef,
  leftAngleBtnRef,
  betLevelRef,
  isRolling,
  isControlsHover,
}: BetLevelInfoBarControlsParams): void => {
  // left bet level btn
  if (
    leftAngleBtnDisabledRef.current &&
    (betLevelRef.current === MIN_BET_LEVEL || isRolling.current)
  ) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnDisabledRef,
      params: [
        BET_LEVEL_LEFT_BUTTON.x,
        BET_LEVEL_LEFT_BUTTON.y,
        BET_LEVEL_LEFT_BUTTON.w,
        BET_LEVEL_LEFT_BUTTON.h,
      ],
    });
  } else if (leftAngleBtnHoverRef.current && isControlsHover.current.betLevelRefLeftBtn) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnHoverRef,
      params: [
        BET_LEVEL_LEFT_BUTTON.x,
        BET_LEVEL_LEFT_BUTTON.y,
        BET_LEVEL_LEFT_BUTTON.w,
        BET_LEVEL_LEFT_BUTTON.h,
      ],
    });
  } else if (leftAngleBtnRef.current) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnRef,
      params: [
        BET_LEVEL_LEFT_BUTTON.x,
        BET_LEVEL_LEFT_BUTTON.y,
        BET_LEVEL_LEFT_BUTTON.w,
        BET_LEVEL_LEFT_BUTTON.h,
      ],
    });
  }

  // right bet level btn
  if (
    rightAngleBtnDisabledRef.current &&
    (betLevelRef.current === MAX_BET_LEVEL || isRolling.current)
  ) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnDisabledRef,
      params: [
        BET_LEVEL_RIGHT_BUTTON.x,
        BET_LEVEL_RIGHT_BUTTON.y,
        BET_LEVEL_RIGHT_BUTTON.w,
        BET_LEVEL_RIGHT_BUTTON.h,
      ],
    });
  } else if (rightAngleBtnHoverRef.current && isControlsHover.current.betLevelRefRightBtn) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnHoverRef,
      params: [
        BET_LEVEL_RIGHT_BUTTON.x,
        BET_LEVEL_RIGHT_BUTTON.y,
        BET_LEVEL_RIGHT_BUTTON.w,
        BET_LEVEL_RIGHT_BUTTON.h,
      ],
    });
  } else if (rightAngleBtnRef.current) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnRef,
      params: [
        BET_LEVEL_RIGHT_BUTTON.x,
        BET_LEVEL_RIGHT_BUTTON.y,
        BET_LEVEL_RIGHT_BUTTON.w,
        BET_LEVEL_RIGHT_BUTTON.h,
      ],
    });
  }
};

interface MaxBetButtonParams {
  ctx: CanvasRenderingContext2D;
  buttonHoverRef: MutableRefObject<HTMLImageElement | null>;
  buttonDisabledRef: MutableRefObject<HTMLImageElement | null>;
  buttonRef: MutableRefObject<HTMLImageElement | null>;
  isRolling: MutableRefObject<boolean>;
  isControlsHover: MutableRefObject<{
    [key: string]: boolean;
  }>;
}

export const drawMaxBetButton = ({
  ctx,
  buttonDisabledRef,
  buttonHoverRef,
  buttonRef,
  isRolling,
  isControlsHover,
}: MaxBetButtonParams): void => {
  if (buttonDisabledRef.current && isRolling.current) {
    drawImage({
      ctx,
      imageRef: buttonDisabledRef,
      params: [MAX_BET_BUTTON.x, MAX_BET_BUTTON.y, MAX_BET_BUTTON.w, MAX_BET_BUTTON.h],
    });
  } else if (buttonHoverRef.current && isControlsHover.current.maxBetBtn) {
    drawImage({
      ctx,
      imageRef: buttonHoverRef,
      params: [MAX_BET_BUTTON.x, MAX_BET_BUTTON.y, MAX_BET_BUTTON.w, MAX_BET_BUTTON.h],
    });
  } else if (buttonRef.current) {
    drawImage({
      ctx,
      imageRef: buttonRef,
      params: [MAX_BET_BUTTON.x, MAX_BET_BUTTON.y, MAX_BET_BUTTON.w, MAX_BET_BUTTON.h],
    });
  }

  ctx.save();
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText('MAX', 790, 652);
  ctx.fillText('BET', 792, 667);
  ctx.restore();
};

interface CoinValueInfoBarParams {
  ctx: CanvasRenderingContext2D;
  greenLineRef: MutableRefObject<HTMLImageElement | null>;
  infoBarWithControlsImgRef: MutableRefObject<HTMLImageElement | null>;
  coinValueRef: MutableRefObject<number>;
}

export const drawCoinValueInfoBar = ({
  ctx,
  greenLineRef,
  infoBarWithControlsImgRef,
  coinValueRef,
}: CoinValueInfoBarParams): void => {
  if (infoBarWithControlsImgRef.current && greenLineRef.current) {
    ctx.drawImage(infoBarWithControlsImgRef.current, 880, 635, 100, 40);
    ctx.drawImage(greenLineRef.current, 910, 664, 5.7 * (coinValueRef.current + 1), 4);
    ctx.save();
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = 'white';
    let titleX = 927;
    if (coinValueRef.current >= 0 && coinValueRef.current <= 2) {
      titleX = 918;
    } else if (coinValueRef.current > 2 && coinValueRef.current <= 5) {
      titleX = 922;
    }
    ctx.fillText(`${COIN_VALUES[coinValueRef.current]}`, titleX, 658);
    ctx.restore();
    ctx.save();
    ctx.font = '12px sans-serif';
    ctx.fillText('COIN VALUE', 892, 633);
    ctx.restore();
  }
};

interface CoinValueInfoBarControlsParams {
  ctx: CanvasRenderingContext2D;
  rightAngleBtnDisabledRef: MutableRefObject<HTMLImageElement | null>;
  rightAngleBtnHoverRef: MutableRefObject<HTMLImageElement | null>;
  rightAngleBtnRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnDisabledRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnHoverRef: MutableRefObject<HTMLImageElement | null>;
  leftAngleBtnRef: MutableRefObject<HTMLImageElement | null>;
  coinValueRef: MutableRefObject<number>;
  isRolling: MutableRefObject<boolean>;
  isControlsHover: MutableRefObject<{
    [key: string]: boolean;
  }>;
}

export const drawCoinValueInfoBarControls = ({
  ctx,
  rightAngleBtnDisabledRef,
  rightAngleBtnHoverRef,
  rightAngleBtnRef,
  leftAngleBtnDisabledRef,
  leftAngleBtnHoverRef,
  leftAngleBtnRef,
  coinValueRef,
  isRolling,
  isControlsHover,
}: CoinValueInfoBarControlsParams): void => {
  // left coin value btn
  if (leftAngleBtnDisabledRef.current && (coinValueRef.current === 0 || isRolling.current)) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnDisabledRef,
      params: [
        COIN_VALUE_LEFT_BUTTON.x,
        COIN_VALUE_LEFT_BUTTON.y,
        COIN_VALUE_LEFT_BUTTON.w,
        COIN_VALUE_LEFT_BUTTON.h,
      ],
    });
  } else if (leftAngleBtnHoverRef.current && isControlsHover.current.coinValueRefLeftBtn) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnHoverRef,
      params: [
        COIN_VALUE_LEFT_BUTTON.x,
        COIN_VALUE_LEFT_BUTTON.y,
        COIN_VALUE_LEFT_BUTTON.w,
        COIN_VALUE_LEFT_BUTTON.h,
      ],
    });
  } else if (leftAngleBtnRef.current) {
    drawImage({
      ctx,
      imageRef: leftAngleBtnRef,
      params: [
        COIN_VALUE_LEFT_BUTTON.x,
        COIN_VALUE_LEFT_BUTTON.y,
        COIN_VALUE_LEFT_BUTTON.w,
        COIN_VALUE_LEFT_BUTTON.h,
      ],
    });
  }

  // right coin value btn
  if (
    rightAngleBtnDisabledRef.current &&
    (coinValueRef.current === COIN_VALUES.length - 1 || isRolling.current)
  ) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnDisabledRef,
      params: [
        COIN_VALUE_RIGHT_BUTTON.x,
        COIN_VALUE_RIGHT_BUTTON.y,
        COIN_VALUE_RIGHT_BUTTON.w,
        COIN_VALUE_RIGHT_BUTTON.h,
      ],
    });
  } else if (rightAngleBtnHoverRef.current && isControlsHover.current.coinValueRefRightBtn) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnHoverRef,
      params: [
        COIN_VALUE_RIGHT_BUTTON.x,
        COIN_VALUE_RIGHT_BUTTON.y,
        COIN_VALUE_RIGHT_BUTTON.w,
        COIN_VALUE_RIGHT_BUTTON.h,
      ],
    });
  } else if (rightAngleBtnRef.current) {
    drawImage({
      ctx,
      imageRef: rightAngleBtnRef,
      params: [
        COIN_VALUE_RIGHT_BUTTON.x,
        COIN_VALUE_RIGHT_BUTTON.y,
        COIN_VALUE_RIGHT_BUTTON.w,
        COIN_VALUE_RIGHT_BUTTON.h,
      ],
    });
  }
};

interface NumberOfCoinsInfoBarParams {
  ctx: CanvasRenderingContext2D;
  infoBarImgRef: MutableRefObject<HTMLImageElement | null>;
  numberOfCoinsRef: MutableRefObject<number>;
}

export const drawNumberOfCoinsInfoBar = ({
  ctx,
  infoBarImgRef,
  numberOfCoinsRef,
}: NumberOfCoinsInfoBarParams): void => {
  if (infoBarImgRef.current) {
    ctx.drawImage(infoBarImgRef.current, 985, 634, 120, 45);
    ctx.save();
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = 'white';
    const xOffset = numberOfCoinsRef.current.toString().split('');
    xOffset.shift();
    const titleX = 1040 - xOffset.length * 3.5;
    ctx.fillText(`${numberOfCoinsRef.current}`, titleX, 660);
    ctx.restore();
    ctx.save();
    ctx.font = '12px sans-serif';
    ctx.fillText('COINS ', 1025, 634);
    ctx.restore();
  }
};
