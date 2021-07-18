import { FC, useEffect, useState, useCallback, useRef, useLayoutEffect, MouseEvent } from 'react';
import forEach from 'lodash/forEach';

import backgroundImageSrc from 'assets/decorative/game-bg.jpg';
import logoImageSrc from 'assets/decorative/logo.png';
import borderImageSrc from 'assets/decorative/border.png';
import borderTopImageSrc from 'assets/decorative/border-top.png';
import princessImageSrc from 'assets/decorative/princess.png';
import columnImageSrc from 'assets/decorative/column-bg.png';
import columnTopImageSrc from 'assets/decorative/column-top.png';
import columnBottomImageSrc from 'assets/decorative/column-bottom.png';
import yellowCircle from 'assets/decorative/yellow-circle.png';
import borderColumnBottomImage from 'assets/decorative/border-column-bottom.png';
import aSymbolSrc from 'assets/symbols/a.png';
import coinsSymbolSrc from 'assets/symbols/coins.png';
import greenDragonSymbolSrc from 'assets/symbols/green-dragon.png';
import jSymbolSrc from 'assets/symbols/j.png';
import kSymbolSrc from 'assets/symbols/k.png';
import qSymbolSrc from 'assets/symbols/q.png';
import tenSymbolSrc from 'assets/symbols/ten.png';
import princessSymbolSrc from 'assets/symbols/princess.png';
import wildSymbolSrc from 'assets/symbols/wild.png';
import yellowDragonSymbolSrc from 'assets/symbols/yellow-dragon.png';
import movingASymbolSrc from 'assets/symbols/moving-a.png';
import movingCoinsSymbolSrc from 'assets/symbols/moving-coins.png';
import movingGreenDragonSymbolSrc from 'assets/symbols/moving-green-dragon.png';
import movingJSymbolSrc from 'assets/symbols/moving-j.png';
import movingKSymbolSrc from 'assets/symbols/moving-k.png';
import movingQSymbolSrc from 'assets/symbols/moving-q.png';
import movingTenSymbolSrc from 'assets/symbols/moving-ten.png';
import movingPrincessSymbolSrc from 'assets/symbols/moving-princess.png';
import movingWildSymbolSrc from 'assets/symbols/moving-wild.png';
import movingYellowDragonSymbolSrc from 'assets/symbols/moving-yellow-dragon.png';
import spinBtn from 'assets/controls/spin-btn.png';
import spinActiveBtn from 'assets/controls/spin-btn-active.png';
import spinDisabledBtn from 'assets/controls/spin-btn-disabled.png';
import infoBarImageSrc from 'assets/controls/infoBar.png';
import infoBarWithControlsImageSrc from 'assets/controls/infoBarWithControls.png';
import rightAngleBtn from 'assets/controls/right-angle-btn.png';
import rightAngleHoverBtn from 'assets/controls/right-angle-btn-hover.png';
import rightAngleDisabledBtn from 'assets/controls/right-angle-btn-disabled.png';
import leftAngleBtn from 'assets/controls/left-angle-btn.png';
import leftAngleHoverBtn from 'assets/controls/left-angle-btn-hover.png';
import leftAngleDisabledBtn from 'assets/controls/left-angle-btn-disabled.png';
import buttonImg from 'assets/controls/button.png';
import buttonHoverImg from 'assets/controls/button-hover.png';
import buttonDisabledImg from 'assets/controls/button-disabled.png';
import greenLineImg from 'assets/green-line.png';
import winCombinationNumbersImage from 'assets/win-combination-numbers.png';
import Slot from 'types/Slot';
import WiningData from 'types/WiningData';
import GameFieldFooter from './GameFieldFooter';
import drawCombinations from './utils/drawCombinations';
import drawColumns from './utils/drawColumns';
import drawSymbols from './utils/drawSymbols';
import {
  drawSpinButton,
  drawBetValueInfoBar,
  drawBetLevelInfoBar,
  drawBetLevelInfoBarControls,
  drawMaxBetButton,
  drawCoinValueInfoBar,
  drawCoinValueInfoBarControls,
  drawNumberOfCoinsInfoBar,
} from './utils/drawControls';
import {
  showTotalWiningInfoBar,
  showAllWiningCombinations,
  showAllWiningSlots,
  showWiningCombination,
  showWiningCombinationSlots,
} from './utils/animateWin';
import {
  drawBackground,
  drawLogo,
  drawPrincess,
  drawGameFieldBorders,
} from './utils/drawDecorativeElements';
import {
  generateColumnSlots,
  loadImage,
  calculateBet,
  handleRolling,
  handleSpinClicked,
  handleLoadingProgress,
} from './utils/base';
import {
  combinationsData,
  A_SYMBOL,
  COINS_SYMBOL,
  GREEN_DRAGON_SYMBOL,
  J_SYMBOL,
  K_SYMBOL,
  PRINCES_SYMBOL,
  Q_SYMBOL,
  TEN_SYMBOL,
  WILD_SYMBOL,
  YELLOW_DRAGON_SYMBOL,
} from './data/combinationsData';
import {
  COIN_VALUES,
  TOTAL_WIN_HIDE_DELAY,
  SHOW_WIN_COMBINATION_TIME,
  MAX_BET_LEVEL,
  MIN_BET_LEVEL,
  NUMBER_OF_ALL_IMAGES,
} from './constants/common';
import {
  SPIN_BUTTON,
  MAX_BET_BUTTON,
  BET_LEVEL_LEFT_BUTTON,
  BET_LEVEL_RIGHT_BUTTON,
  COIN_VALUE_LEFT_BUTTON,
  COIN_VALUE_RIGHT_BUTTON,
} from './constants/controlsCoordinates';
import './styles.css';

const GameField: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const borderRef = useRef<HTMLImageElement | null>(null);
  const borderTopRef = useRef<HTMLImageElement | null>(null);
  const princessRef = useRef<HTMLImageElement | null>(null);
  const columnBgRef = useRef<HTMLImageElement | null>(null);
  const columTopRef = useRef<HTMLImageElement | null>(null);
  const columBottomRef = useRef<HTMLImageElement | null>(null);
  const yellowCircleRef = useRef<HTMLImageElement | null>(null);

  const symbolARef = useRef<HTMLImageElement | null>(null);
  const symbolCoinsRef = useRef<HTMLImageElement | null>(null);
  const symbolGreenDragonRef = useRef<HTMLImageElement | null>(null);
  const symbolJRef = useRef<HTMLImageElement | null>(null);
  const symbolKRef = useRef<HTMLImageElement | null>(null);
  const symbolQRef = useRef<HTMLImageElement | null>(null);
  const symbolTenRef = useRef<HTMLImageElement | null>(null);
  const symbolPrincessRef = useRef<HTMLImageElement | null>(null);
  const symbolWildRef = useRef<HTMLImageElement | null>(null);
  const symbolYellowDragonRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolARef = useRef<HTMLImageElement | null>(null);
  const movingSymbolCoinsRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolGreenDragonRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolJRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolKRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolQRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolTenRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolPrincessRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolWildRef = useRef<HTMLImageElement | null>(null);
  const movingSymbolYellowDragonRef = useRef<HTMLImageElement | null>(null);

  const spinBtnRef = useRef<HTMLImageElement | null>(null);
  const spinActiveBtnRef = useRef<HTMLImageElement | null>(null);
  const spinDisabledBtnRef = useRef<HTMLImageElement | null>(null);
  const infoBarImgRef = useRef<HTMLImageElement | null>(null);
  const rightAngleBtnRef = useRef<HTMLImageElement | null>(null);
  const rightAngleBtnHoverRef = useRef<HTMLImageElement | null>(null);
  const rightAngleBtnDisabledRef = useRef<HTMLImageElement | null>(null);
  const leftAngleBtnRef = useRef<HTMLImageElement | null>(null);
  const leftAngleBtnHoverRef = useRef<HTMLImageElement | null>(null);
  const leftAngleBtnDisabledRef = useRef<HTMLImageElement | null>(null);
  const infoBarWithControlsImgRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLImageElement | null>(null);
  const buttonHoverRef = useRef<HTMLImageElement | null>(null);
  const buttonDisabledRef = useRef<HTMLImageElement | null>(null);

  const winCombinationNumbersRef = useRef<HTMLImageElement | null>(null);
  const greenLineRef = useRef<HTMLImageElement | null>(null);
  const borderColumnBottomImageRef = useRef<HTMLImageElement | null>(null);

  const numberOfUploadedImages = useRef(0);
  const isRolling = useRef<boolean>(false);
  const winingDataRef = useRef<WiningData | null>(null);
  const combinationsHover = useRef(combinationsData);
  const isControlsHover = useRef<{ [key: string]: boolean }>({
    spinButton: false,
    betLevelRefLeftBtn: false,
    betLevelRefRightBtn: false,
    maxBetBtn: false,
    coinValueRefLeftBtn: false,
    coinValueRefRightBtn: false,
  });
  const currentDistance = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const totalWinHideDelay = useRef<number>(TOTAL_WIN_HIDE_DELAY);
  const showWinCombinationTime = useRef<number>(SHOW_WIN_COMBINATION_TIME);
  const currentShownWinCombinationIndex = useRef<number>(0);
  const borderBottomChangeTimeRef = useRef<number>(0);
  const borderBottomOffsetIndexRef = useRef<number>(0);

  const symbols = useRef([
    { ref: symbolARef, movingSymbolRef: movingSymbolARef, value: A_SYMBOL },
    {
      ref: symbolCoinsRef,
      movingSymbolRef: movingSymbolCoinsRef,
      value: COINS_SYMBOL,
    },
    {
      ref: symbolGreenDragonRef,
      movingSymbolRef: movingSymbolGreenDragonRef,
      value: GREEN_DRAGON_SYMBOL,
    },
    { ref: symbolJRef, movingSymbolRef: movingSymbolJRef, value: J_SYMBOL },
    { ref: symbolKRef, movingSymbolRef: movingSymbolKRef, value: K_SYMBOL },
    { ref: symbolQRef, movingSymbolRef: movingSymbolQRef, value: Q_SYMBOL },
    {
      ref: symbolTenRef,
      movingSymbolRef: movingSymbolTenRef,
      value: TEN_SYMBOL,
    },
    {
      ref: symbolPrincessRef,
      movingSymbolRef: movingSymbolPrincessRef,
      value: PRINCES_SYMBOL,
    },
    {
      ref: symbolWildRef,
      movingSymbolRef: movingSymbolWildRef,
      value: WILD_SYMBOL,
    },
    {
      ref: symbolYellowDragonRef,
      movingSymbolRef: movingSymbolYellowDragonRef,
      value: YELLOW_DRAGON_SYMBOL,
    },
  ]);
  const firstColumn = useRef<Slot[]>([]);
  const secondColumn = useRef<Slot[]>([]);
  const thirdColumn = useRef<Slot[]>([]);
  const fourthColumn = useRef<Slot[]>([]);
  const fifthColumn = useRef<Slot[]>([]);
  const columns = useRef([firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn]);

  const [cash, setCash] = useState(5000);
  const [win, setWin] = useState(0);
  const [betLevel, setBetLevel] = useState(1);
  const [coinValue, setCoinValue] = useState(0);
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);
  const cashRef = useRef<number>(cash);
  const betLevelRef = useRef<number>(betLevel);
  const coinValueRef = useRef<number>(coinValue);
  const numberOfCoinsRef = useRef<number>(0);
  const isAllImagesLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    betLevelRef.current = betLevel;
    coinValueRef.current = coinValue;
    cashRef.current = cash;
    numberOfCoinsRef.current = Math.round(cash / COIN_VALUES[coinValue]);
    isAllImagesLoadedRef.current = isAllImagesLoaded;
  }, [betLevel, coinValue, cash, isAllImagesLoaded]);

  useEffect(() => {
    columns.current.forEach((column) => {
      const columnSlots = generateColumnSlots(symbols);
      column.current = columnSlots;
    });
  }, []);

  const draw = useCallback((): void => {
    if (!ctxRef.current || !canvasRef.current) {
      return;
    }

    const { current: canvas } = canvasRef;
    const { current: ctx } = ctxRef;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (numberOfUploadedImages.current !== NUMBER_OF_ALL_IMAGES) {
      handleLoadingProgress({ ctx, canvas, numberOfUploadedImages });
    } else if (!isAllImagesLoadedRef.current) {
      setIsAllImagesLoaded(true);
    } else {
      drawBackground({ ctx, imageRef: backgroundRef });
      drawPrincess({
        ctx,
        imageRef: princessRef,
      });
      drawGameFieldBorders({
        ctx,
        borderTopRef,
        borderRef,
        borderColumnBottomImageRef,
        borderBottomChangeTimeRef,
        borderBottomOffsetIndexRef,
      });

      // call when spin button/max bet was clicked
      handleRolling({
        currentDistance,
        isRolling,
        winingDataRef,
        coinValueRef,
        setCash,
        setWin,
      });
      drawColumns({ ctx, columnBgRef, columTopRef, columBottomRef });
      drawLogo({ ctx, imageRef: logoRef, canvasRef });
      drawCombinations({ ctx, combinationsHover, yellowCircleRef });
      drawSymbols({ ctx, columns, symbols, isRolling, winingDataRef });
      // draw when the player win
      showAllWiningCombinations({
        ctx,
        yellowCircleRef,
        isRolling,
        winingDataRef,
        totalWinHideDelay,
      });
      showWiningCombination({
        ctx,
        yellowCircleRef,
        isRolling,
        winingDataRef,
        totalWinHideDelay,
        showWinCombinationTime,
        currentShownWinCombinationIndex,
      });
      showAllWiningSlots({
        ctx,
        isRolling,
        winingDataRef,
        columns,
        totalWinHideDelay,
      });
      showWiningCombinationSlots({
        ctx,
        isRolling,
        winingDataRef,
        columns,
        totalWinHideDelay,
        currentShownWinCombinationIndex,
        winCombinationNumbersRef,
      });
      showTotalWiningInfoBar({
        ctx,
        frameRef,
        infoBarImgRef,
        isRolling,
        winingDataRef,
        totalWinHideDelay,
      });
      // draw controls panel
      drawSpinButton({
        ctx,
        spinBtnRef,
        isRolling,
        isControlsHover,
        spinActiveBtnRef,
        spinDisabledBtnRef,
      });
      drawBetValueInfoBar({ ctx, infoBarImgRef, betLevelRef });
      drawBetLevelInfoBar({
        ctx,
        infoBarWithControlsImgRef,
        greenLineRef,
        betLevelRef,
      });
      drawBetLevelInfoBarControls({
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
      });
      drawMaxBetButton({
        ctx,
        buttonDisabledRef,
        buttonHoverRef,
        buttonRef,
        isControlsHover,
        isRolling,
      });
      drawCoinValueInfoBar({
        ctx,
        greenLineRef,
        infoBarWithControlsImgRef,
        coinValueRef,
      });
      drawCoinValueInfoBarControls({
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
      });
      drawNumberOfCoinsInfoBar({ ctx, infoBarImgRef, numberOfCoinsRef });
    }

    window.requestAnimationFrame(draw);
  }, []);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');

      loadImage(backgroundImageSrc, backgroundRef, numberOfUploadedImages);
      loadImage(logoImageSrc, logoRef, numberOfUploadedImages);
      loadImage(princessImageSrc, princessRef, numberOfUploadedImages);
      loadImage(columnImageSrc, columnBgRef, numberOfUploadedImages);

      // base symbols
      loadImage(aSymbolSrc, symbolARef, numberOfUploadedImages);
      loadImage(coinsSymbolSrc, symbolCoinsRef, numberOfUploadedImages);
      loadImage(greenDragonSymbolSrc, symbolGreenDragonRef, numberOfUploadedImages);
      loadImage(jSymbolSrc, symbolJRef, numberOfUploadedImages);
      loadImage(kSymbolSrc, symbolKRef, numberOfUploadedImages);
      loadImage(qSymbolSrc, symbolQRef, numberOfUploadedImages);
      loadImage(tenSymbolSrc, symbolTenRef, numberOfUploadedImages);
      loadImage(princessSymbolSrc, symbolPrincessRef, numberOfUploadedImages);
      loadImage(wildSymbolSrc, symbolWildRef, numberOfUploadedImages);
      loadImage(yellowDragonSymbolSrc, symbolYellowDragonRef, numberOfUploadedImages);
      // moving symbols
      loadImage(movingASymbolSrc, movingSymbolARef, numberOfUploadedImages);
      loadImage(movingCoinsSymbolSrc, movingSymbolCoinsRef, numberOfUploadedImages);
      loadImage(movingGreenDragonSymbolSrc, movingSymbolGreenDragonRef, numberOfUploadedImages);
      loadImage(movingJSymbolSrc, movingSymbolJRef, numberOfUploadedImages);
      loadImage(movingKSymbolSrc, movingSymbolKRef, numberOfUploadedImages);
      loadImage(movingQSymbolSrc, movingSymbolQRef, numberOfUploadedImages);
      loadImage(movingTenSymbolSrc, movingSymbolTenRef, numberOfUploadedImages);
      loadImage(movingPrincessSymbolSrc, movingSymbolPrincessRef, numberOfUploadedImages);
      loadImage(movingWildSymbolSrc, movingSymbolWildRef, numberOfUploadedImages);
      loadImage(movingYellowDragonSymbolSrc, movingSymbolYellowDragonRef, numberOfUploadedImages);

      loadImage(spinBtn, spinBtnRef, numberOfUploadedImages);
      loadImage(spinActiveBtn, spinActiveBtnRef, numberOfUploadedImages);
      loadImage(spinDisabledBtn, spinDisabledBtnRef, numberOfUploadedImages);
      loadImage(borderImageSrc, borderRef, numberOfUploadedImages);
      loadImage(borderTopImageSrc, borderTopRef, numberOfUploadedImages);
      loadImage(columnTopImageSrc, columTopRef, numberOfUploadedImages);
      loadImage(columnBottomImageSrc, columBottomRef, numberOfUploadedImages);
      loadImage(yellowCircle, yellowCircleRef, numberOfUploadedImages);
      loadImage(infoBarImageSrc, infoBarImgRef, numberOfUploadedImages);
      loadImage(infoBarWithControlsImageSrc, infoBarWithControlsImgRef, numberOfUploadedImages);
      loadImage(rightAngleBtn, rightAngleBtnRef, numberOfUploadedImages);
      loadImage(rightAngleHoverBtn, rightAngleBtnHoverRef, numberOfUploadedImages);
      loadImage(rightAngleDisabledBtn, rightAngleBtnDisabledRef, numberOfUploadedImages);
      loadImage(leftAngleBtn, leftAngleBtnRef, numberOfUploadedImages);
      loadImage(leftAngleHoverBtn, leftAngleBtnHoverRef, numberOfUploadedImages);
      loadImage(leftAngleDisabledBtn, leftAngleBtnDisabledRef, numberOfUploadedImages);
      loadImage(greenLineImg, greenLineRef, numberOfUploadedImages);
      loadImage(buttonImg, buttonRef, numberOfUploadedImages);
      loadImage(buttonHoverImg, buttonHoverRef, numberOfUploadedImages);
      loadImage(buttonDisabledImg, buttonDisabledRef, numberOfUploadedImages);
      loadImage(winCombinationNumbersImage, winCombinationNumbersRef, numberOfUploadedImages);
      loadImage(borderColumnBottomImage, borderColumnBottomImageRef, numberOfUploadedImages);

      window.requestAnimationFrame(draw);
    }
  }, [draw]);

  const handleClick = (event: MouseEvent<HTMLCanvasElement>): void => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // spin btn
      const radius = SPIN_BUTTON.h / 2;
      const cx = SPIN_BUTTON.x + radius;
      const cy = SPIN_BUTTON.y + radius;
      const dx = cx - x;
      const dy = cy - y;
      if (dx * dx + dy * dy <= radius * radius) {
        const bet = calculateBet(betLevelRef.current, coinValueRef.current);
        if (bet > cashRef.current) {
          window.alert(`You don't have enough money! Decrease your bet or float the balance`);
        } else {
          handleSpinClicked({
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
          });
        }
      }

      // left bet level btn
      if (
        x >= BET_LEVEL_LEFT_BUTTON.x &&
        x <= BET_LEVEL_LEFT_BUTTON.x + BET_LEVEL_LEFT_BUTTON.w &&
        y >= BET_LEVEL_LEFT_BUTTON.y &&
        y <= BET_LEVEL_LEFT_BUTTON.y + BET_LEVEL_LEFT_BUTTON.h &&
        betLevelRef.current > MIN_BET_LEVEL
      ) {
        setBetLevel((prevValue) => prevValue - 1);
      }

      // right bet level btn
      if (
        x >= BET_LEVEL_RIGHT_BUTTON.x &&
        x <= BET_LEVEL_RIGHT_BUTTON.x + BET_LEVEL_RIGHT_BUTTON.w &&
        y >= BET_LEVEL_RIGHT_BUTTON.y &&
        y <= BET_LEVEL_RIGHT_BUTTON.y + BET_LEVEL_RIGHT_BUTTON.h &&
        betLevelRef.current < MAX_BET_LEVEL
      ) {
        setBetLevel((prevValue) => prevValue + 1);
      }

      // max bet btn
      if (
        x >= MAX_BET_BUTTON.x &&
        x <= MAX_BET_BUTTON.x + MAX_BET_BUTTON.w &&
        y >= MAX_BET_BUTTON.y &&
        y <= MAX_BET_BUTTON.y + MAX_BET_BUTTON.h
      ) {
        const bet = calculateBet(betLevelRef.current, coinValueRef.current);
        if (betLevelRef.current !== MAX_BET_LEVEL) {
          setBetLevel(MAX_BET_LEVEL);
        } else if (bet > cashRef.current) {
          window.alert(`You don't have enough money! Decrease your bet or float the balance`);
        } else if (!isRolling.current) {
          handleSpinClicked({
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
          });
        }
      }

      // left coin value btn
      if (
        x >= COIN_VALUE_LEFT_BUTTON.x &&
        x <= COIN_VALUE_LEFT_BUTTON.x + COIN_VALUE_LEFT_BUTTON.w &&
        y >= COIN_VALUE_LEFT_BUTTON.y &&
        y <= COIN_VALUE_LEFT_BUTTON.y + COIN_VALUE_LEFT_BUTTON.h &&
        coinValueRef.current > 0
      ) {
        setCoinValue((prevValue) => prevValue - 1);
      }

      // right coin value btn
      if (
        x >= COIN_VALUE_RIGHT_BUTTON.x &&
        x <= COIN_VALUE_RIGHT_BUTTON.x + COIN_VALUE_RIGHT_BUTTON.w &&
        y >= COIN_VALUE_RIGHT_BUTTON.y &&
        y <= COIN_VALUE_RIGHT_BUTTON.y + COIN_VALUE_RIGHT_BUTTON.h &&
        coinValueRef.current < COIN_VALUES.length - 1
      ) {
        setCoinValue((prevValue) => prevValue + 1);
      }
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // spin btn
      const radius = SPIN_BUTTON.h / 2;
      const cx = SPIN_BUTTON.x + radius;
      const cy = SPIN_BUTTON.y + radius;
      const dx = cx - x;
      const dy = cy - y;
      if (dx * dx + dy * dy <= radius * radius) {
        isControlsHover.current.spinButton = true;
      } else {
        isControlsHover.current.spinButton = false;
      }

      // left bet level btn
      if (
        x >= BET_LEVEL_LEFT_BUTTON.x &&
        x <= BET_LEVEL_LEFT_BUTTON.x + BET_LEVEL_LEFT_BUTTON.w &&
        y >= BET_LEVEL_LEFT_BUTTON.y &&
        y <= BET_LEVEL_LEFT_BUTTON.y + BET_LEVEL_LEFT_BUTTON.h &&
        betLevelRef.current > MIN_BET_LEVEL
      ) {
        isControlsHover.current.betLevelRefLeftBtn = true;
      } else {
        isControlsHover.current.betLevelRefLeftBtn = false;
      }

      // right bet level btn
      if (
        x >= BET_LEVEL_RIGHT_BUTTON.x &&
        x <= BET_LEVEL_RIGHT_BUTTON.x + BET_LEVEL_RIGHT_BUTTON.w &&
        y >= BET_LEVEL_RIGHT_BUTTON.y &&
        y <= BET_LEVEL_RIGHT_BUTTON.y + BET_LEVEL_RIGHT_BUTTON.h &&
        betLevelRef.current < MAX_BET_LEVEL
      ) {
        isControlsHover.current.betLevelRefRightBtn = true;
      } else {
        isControlsHover.current.betLevelRefRightBtn = false;
      }

      // max bet btn
      if (
        x >= MAX_BET_BUTTON.x &&
        x <= MAX_BET_BUTTON.x + MAX_BET_BUTTON.w &&
        y >= MAX_BET_BUTTON.y &&
        y <= MAX_BET_BUTTON.y + MAX_BET_BUTTON.h
      ) {
        isControlsHover.current.maxBetBtn = true;
      } else {
        isControlsHover.current.maxBetBtn = false;
      }

      // left coin value btn
      if (
        x >= COIN_VALUE_LEFT_BUTTON.x &&
        x <= COIN_VALUE_LEFT_BUTTON.x + COIN_VALUE_LEFT_BUTTON.w &&
        y >= COIN_VALUE_LEFT_BUTTON.y &&
        y <= COIN_VALUE_LEFT_BUTTON.y + COIN_VALUE_LEFT_BUTTON.h &&
        coinValueRef.current > 0
      ) {
        isControlsHover.current.coinValueRefLeftBtn = true;
      } else {
        isControlsHover.current.coinValueRefLeftBtn = false;
      }

      // right coin value btn
      if (
        x >= COIN_VALUE_RIGHT_BUTTON.x &&
        x <= COIN_VALUE_RIGHT_BUTTON.x + COIN_VALUE_RIGHT_BUTTON.w &&
        y >= COIN_VALUE_RIGHT_BUTTON.y &&
        y <= COIN_VALUE_RIGHT_BUTTON.y + COIN_VALUE_RIGHT_BUTTON.h &&
        coinValueRef.current < COIN_VALUES.length - 1
      ) {
        isControlsHover.current.coinValueRefRightBtn = true;
      } else {
        isControlsHover.current.coinValueRefRightBtn = false;
      }

      // draw win combinations on hover
      forEach(combinationsHover.current, ({ x1, x2, y1, y2 }, key) => {
        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
          combinationsHover.current[key].hover = true;
        } else {
          combinationsHover.current[key].hover = false;
        }
      });
    }
  };

  const betValueInCash = calculateBet(betLevel, coinValue);

  return (
    <div className="container">
      <canvas
        width={1280}
        height={720}
        ref={canvasRef}
        onClick={handleClick}
        onPointerMove={handleMouseMove}
      />
      {isAllImagesLoaded && (
        <GameFieldFooter cash={cash} win={win} betValueInCash={betValueInCash} />
      )}
    </div>
  );
};

export default GameField;
