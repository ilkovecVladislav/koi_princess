import { MutableRefObject } from "react";
import map from "lodash/map";

import combinationsData, {
  symbolPayoutValue,
  WILD_SYMBOL,
  PRINCES_SYMBOL,
} from "../data/combinationsData";
import Slot from "types/Slot";

const getVisibleElementsAfterSpin = (
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>
): Slot[][] =>
  columns.current.map((column) =>
    column.current.filter((item) => item.isUsedToCalculateWin)
  );

const getElementsOfCurrentCombination = (data: Slot[]): string[] => {
  const [firstElement, ...rest] = data;
  const formattedRestData = rest.map((item) => item.value);

  const combinationRow = formattedRestData.reduce(
    (acc, cur: string) => {
      const lastElement = acc[acc.length - 1];
      if (lastElement === cur || lastElement === WILD_SYMBOL) {
        return [...acc, cur];
      } else if (cur === WILD_SYMBOL) {
        return [...acc, lastElement];
      }
      return [...acc, "BREAK"];
    },
    [firstElement.value]
  );

  const result: string[] = [];

  for (let item of combinationRow) {
    if (item === "BREAK") {
      break;
    }
    result.push(item);
  }

  return result;
};

const formatCombinationData = (
  data: string[],
  combinationName: string
): {
  combinationName: string;
  symbolName: string;
  amount: number;
} | null => {
  if (data.length < 2) {
    return null;
  }

  if (data.length === 2) {
    const [first, second] = data;
    if (
      (first !== second &&
        first === WILD_SYMBOL &&
        second === PRINCES_SYMBOL) ||
      (first === PRINCES_SYMBOL && second === WILD_SYMBOL) ||
      [first, second].every((item) => item === PRINCES_SYMBOL)
    ) {
      return {
        combinationName,
        symbolName: PRINCES_SYMBOL,
        amount: 2,
      };
    } else if ([first, second].every((item) => item === WILD_SYMBOL)) {
      return {
        combinationName,
        symbolName: WILD_SYMBOL,
        amount: 2,
      };
    } else {
      return null;
    }
  }

  const symbolName = data.find((item) => item !== WILD_SYMBOL);

  if (!symbolName) {
    return {
      combinationName,
      symbolName: WILD_SYMBOL,
      amount: data.length,
    };
  }
  return {
    combinationName,
    symbolName,
    amount: data.length,
  };
};

const calculateWin = (
  columns: MutableRefObject<MutableRefObject<Slot[]>[]>,
  betLevel: number
): Promise<{
  payouts: {
    payout: number;
    combinationName: string;
    symbolName: string;
    amount: number;
  }[];
  totalPayout: number;
}> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const visibleElements = getVisibleElementsAfterSpin(columns);
      const winingCombinations = map(
        combinationsData,
        ({ combination }, combinationName) => {
          const allElementsOnCombinationLine = combination.map(
            (slotIndex, columnIndex) => visibleElements[columnIndex][slotIndex]
          );

          const result = getElementsOfCurrentCombination(
            allElementsOnCombinationLine
          );

          return formatCombinationData(result, combinationName);
        }
      ).filter((item) => item !== null) as {
        combinationName: string;
        symbolName: string;
        amount: number;
      }[];

      const payouts = winingCombinations.map((item) => {
        const { symbolName, amount } = item;
        return {
          ...item,
          payout: symbolPayoutValue[symbolName][amount] * betLevel,
        };
      });
      const totalPayout = payouts.reduce((acc, cur) => acc + cur.payout, 0);

      resolve({
        payouts,
        totalPayout,
      });
    }, 700)
  );

export default calculateWin;
