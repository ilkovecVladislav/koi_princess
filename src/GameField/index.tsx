import { useEffect, useRef, useLayoutEffect, MutableRefObject } from "react";
import random from "lodash/random";
import backgroundImageSrc from "assets/game-bg.jpg";
import logoImageSrc from "assets/logo.png";
import princessImageSrc from "assets/princess.png";
import columnImageSrc from "assets/column-bg.png";
import SpinBtn from "assets/spin-btn.png";
import SpinActiveBtn from "assets/spin-btn-active.png";
import SpinDisabledBtn from "assets/spin-btn-disabled.png";
import SymbolAImageSrc from "assets/symbols/a.png";
import SymbolCoinsImageSrc from "assets/symbols/coins.png";
import SymbolFrogImageSrc from "assets/symbols/frog.png";
import SymbolJImageSrc from "assets/symbols/j.png";
import SymbolKImageSrc from "assets/symbols/k.png";
import SymbolQImageSrc from "assets/symbols/q.png";
import SymbolTenImageSrc from "assets/symbols/ten.png";
import SymbolPrincessImageSrc from "assets/symbols/princess.png";

import "./styles.css";

const loadImage = (
  src: string,
  ref: MutableRefObject<HTMLImageElement | null>,
  ...rest: number[]
): void => {
  const image = new Image(...rest);
  image.onload = () => {
    ref.current = image;
  };
  image.src = src;
};

const GameField = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const backgroundRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const princessRef = useRef<HTMLImageElement | null>(null);
  const columnBgRef = useRef<HTMLImageElement | null>(null);
  const spinBtnRef = useRef<HTMLImageElement | null>(null);
  const spinActiveBtnRef = useRef<HTMLImageElement | null>(null);
  const spinDisabledBtnRef = useRef<HTMLImageElement | null>(null);
  const symbolARef = useRef<HTMLImageElement | null>(null);
  const symbolCoinsRef = useRef<HTMLImageElement | null>(null);
  const symbolFrogRef = useRef<HTMLImageElement | null>(null);
  const symbolJRef = useRef<HTMLImageElement | null>(null);
  const symbolKRef = useRef<HTMLImageElement | null>(null);
  const symbolQRef = useRef<HTMLImageElement | null>(null);
  const symbolTenRef = useRef<HTMLImageElement | null>(null);
  const symbolPrincessRef = useRef<HTMLImageElement | null>(null);
  const isRolling = useRef<boolean>(false);
  const isHover = useRef<{ [key: string]: boolean }>({
    spinButton: false,
  });
  const symbols = useRef([
    { ref: symbolARef, value: 10 },
    { ref: symbolCoinsRef, value: 15 },
    { ref: symbolFrogRef, value: 20 },
    { ref: symbolJRef, value: 25 },
    { ref: symbolKRef, value: 30 },
    { ref: symbolQRef, value: 35 },
    { ref: symbolTenRef, value: 40 },
    { ref: symbolPrincessRef, value: 45 },
  ]);
  const firstColumn = useRef<any[]>([]);

  useEffect(() => {
    for (let i = 0; i < 12; i += 1) {
      const randomValue = random(0, 7);
      const randomSymbol = symbols.current[randomValue];
      let slot = {
        ...randomSymbol,
        y: 70 + 160 * i,
        h: 160,
        offset: 0,
      };
      if (i > 2) {
        slot.h = 0;
      }

      firstColumn.current.push(slot);
    }
  }, []);

  const draw = (timestamp: number): void => {
    if (!ctxRef.current || !canvasRef.current) {
      return;
    }
    const { current: canvas } = canvasRef;
    const { current: ctx } = ctxRef;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundRef.current) {
      ctx.drawImage(backgroundRef.current, 0, 0);
    }

    if (princessRef.current) {
      const imageWidth = 180;
      const ratio = princessRef.current.height / princessRef.current.width;
      ctx.drawImage(
        princessRef.current,
        0,
        150,
        imageWidth,
        imageWidth + 130 * ratio
      );
    }

    if (columnBgRef.current) {
      ctx.drawImage(columnBgRef.current, 240, 50);
      ctx.drawImage(
        columnBgRef.current,
        240 + columnBgRef.current.width * 1,
        50
      );
      ctx.drawImage(
        columnBgRef.current,
        240 + columnBgRef.current.width * 2,
        50
      );
      ctx.drawImage(
        columnBgRef.current,
        240 + columnBgRef.current.width * 3,
        50
      );
      ctx.drawImage(
        columnBgRef.current,
        240 + columnBgRef.current.width * 4,
        50
      );
    }

    if (logoRef.current) {
      const imageWidth = 500;
      const ratio = logoRef.current.height / logoRef.current.width;
      ctx.drawImage(
        logoRef.current,
        canvasRef.current.width / 2 - 250,
        10,
        imageWidth,
        imageWidth * ratio
      );
    }

    if (symbolCoinsRef.current) {
      // ctx.drawImage(
      //   symbolCoinsRef.current,
      //   0,
      //   0,
      //   symbolCoinsRef.current.width,
      //   symbolCoinsRef.current.height / 2 - 50,
      //   255,
      //   300,
      //   150,
      //   50
      // );
      // distance.current += 1;
      // if (distance.current > 550) {
      //   distance.current = 0;
      // }
    }

    if (firstColumn.current.length >= 0) {
      firstColumn.current.forEach((item) => {
        if (item.ref.current) {
          const ratio = item.ref.current.height / item.ref.current.width;

          if (
            item.ref.current &&
            isRolling.current &&
            item.y >= 0 &&
            item.h < 160
          ) {
            ctx.drawImage(
              item.ref.current,
              0,
              item.offset,
              160,
              item.h,
              255,
              item.y,
              160,
              item.h
            );
          } else if (item.ref.current && isRolling.current) {
            ctx.drawImage(
              item.ref.current,
              0,
              0,
              160,
              item.h,
              255,
              item.y,
              160,
              item.h
            );
          } else if (item.ref.current && !isRolling.current && item.y < 425) {
            ctx.drawImage(
              item.ref.current,
              0,
              0,
              160,
              160,
              255,
              item.y,
              160,
              160
            );
          }

          if (isRolling.current) {
            item.y += 1;

            if (item.y > 425) {
              item.h -= 1;
            } else if (item.y > 40 && item.h < 160) {
              item.h += 1;
              item.offset -= 1;
            }

            if (item.y >= 1990) {
              // if (item.y >= 1920) {
              item.y = 70;
              item.h = 0;
              item.offset = 160;
            }
          }
        }
      });
    }

    if (
      spinBtnRef.current &&
      !isRolling.current &&
      !isHover.current.spinButton
    ) {
      ctx.drawImage(spinBtnRef.current, 665, 620, 70, 70);
    } else if (
      spinActiveBtnRef.current &&
      !isRolling.current &&
      isHover.current.spinButton
    ) {
      ctx.drawImage(spinActiveBtnRef.current, 665, 620, 70, 70);
    } else if (spinDisabledBtnRef.current && isRolling.current) {
      ctx.drawImage(spinDisabledBtnRef.current, 665, 620, 70, 70);
    }

    window.requestAnimationFrame(draw);
  };

  useLayoutEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");

      loadImage(backgroundImageSrc, backgroundRef);
      loadImage(logoImageSrc, logoRef);
      loadImage(princessImageSrc, princessRef);
      loadImage(columnImageSrc, columnBgRef);
      loadImage(SymbolAImageSrc, symbolARef);
      loadImage(SymbolCoinsImageSrc, symbolCoinsRef);
      loadImage(SymbolFrogImageSrc, symbolFrogRef);
      loadImage(SymbolFrogImageSrc, symbolFrogRef);
      loadImage(SymbolJImageSrc, symbolJRef);
      loadImage(SymbolKImageSrc, symbolKRef);
      loadImage(SymbolQImageSrc, symbolQRef);
      loadImage(SymbolTenImageSrc, symbolTenRef);
      loadImage(SymbolPrincessImageSrc, symbolPrincessRef);
      loadImage(SpinBtn, spinBtnRef);
      loadImage(SpinActiveBtn, spinActiveBtnRef);
      loadImage(SpinDisabledBtn, spinDisabledBtnRef);

      // const dpr = window.devicePixelRatio || 1;
      // const { width, height } = canvasRef.current.getBoundingClientRect();

      // canvasRef.current.width = width * dpr;
      // canvasRef.current.height = height * dpr;
      // if (ctxRef.current) {
      //   ctxRef.current.scale(dpr, dpr);
      //   canvasRef.current.style.height = height + "px";
      //   canvasRef.current.style.width = width + "px";
      // }
      window.requestAnimationFrame(draw);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 665 && x <= 665 + 70 && y >= 620 && y <= 620 + 70) {
      isRolling.current = true;
      setTimeout(() => {
        // isRolling.current = false;
      }, 3000);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 665 && x <= 665 + 70 && y >= 620 && y <= 620 + 70) {
      isHover.current.spinButton = true;
    } else {
      isHover.current.spinButton = false;
    }
  };

  return (
    <canvas
      width={1280}
      height={720}
      ref={canvasRef}
      onClick={handleClick}
      onPointerMove={handleMouseMove}
    ></canvas>
  );
};

export default GameField;
