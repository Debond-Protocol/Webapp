import { BigNumberish } from 'ethers';

export interface IAuction {
  seller: string | undefined;
  faceValue: BigNumberish;
  timestamp?: BigNumberish;
  duration: BigNumberish;
  bondAddress?: string;
  maximumPrice?: BigNumberish;
  minimumPrice: BigNumberish;
  winner?: string;
  initialPrice: BigNumberish;
}
