import { FC } from "react";

const FooterItem: FC<{ data: number; title: string }> = ({ data, title }) => (
  <span className="info-text">
    {title}: &#8364;{" "}
    {data.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}
  </span>
);

interface Props {
  cash: number;
  betValueInCash: number;
  win: number;
}

const GameFieldFooter: FC<Props> = ({ cash, betValueInCash, win }) => (
  <div className="game-field-footer">
    <FooterItem data={cash} title="Cash" />
    <FooterItem data={betValueInCash} title="Bet" />
    <FooterItem data={win} title="Win" />
  </div>
);

export default GameFieldFooter;
