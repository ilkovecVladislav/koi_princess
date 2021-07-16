export interface PayoutData {
  payout: number;
  combinationName: string;
  symbolName: string;
  amount: number;
}

interface WiningData {
  payouts: PayoutData[];
  totalPayout: number;
}

export default WiningData;
