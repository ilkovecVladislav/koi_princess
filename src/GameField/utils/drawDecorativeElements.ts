import { MutableRefObject } from 'react';

interface Params {
  ctx: CanvasRenderingContext2D;
  imageRef: MutableRefObject<HTMLImageElement | null>;
}

export const drawBackground = ({ ctx, imageRef }: Params): void => {
  if (imageRef.current) {
    ctx.drawImage(imageRef.current, 0, 0);
  }
};

export const drawPrincess = ({ ctx, imageRef }: Params): void => {
  if (imageRef.current) {
    const imageWidth = 180;
    const ratio = imageRef.current.height / imageRef.current.width;
    ctx.drawImage(imageRef.current, 0, 150, imageWidth, imageWidth + 130 * ratio);
  }
};

interface DrawLogoParams extends Params {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export const drawLogo = ({ ctx, imageRef, canvasRef }: DrawLogoParams): void => {
  if (imageRef.current && canvasRef.current) {
    const imageWidth = 500;
    const ratio = imageRef.current.height / imageRef.current.width;
    ctx.drawImage(
      imageRef.current,
      canvasRef.current.width / 2 - 200,
      10,
      imageWidth,
      imageWidth * ratio,
    );
  }
};

interface DrawGameFieldBordersParams {
  ctx: CanvasRenderingContext2D;
  borderTopRef: MutableRefObject<HTMLImageElement | null>;
  borderRef: MutableRefObject<HTMLImageElement | null>;
}

export const drawGameFieldBorders = ({
  ctx,
  borderTopRef,
  borderRef,
}: DrawGameFieldBordersParams): void => {
  if (borderTopRef.current) {
    ctx.drawImage(borderTopRef.current, 230, 45, 930, 10);
  }
  ctx.save();
  if (borderRef.current) {
    ctx.drawImage(borderRef.current, 160, 30);
    ctx.scale(-1, 1);
    ctx.drawImage(borderRef.current, -1220, 30);
  }
  ctx.restore();
};
