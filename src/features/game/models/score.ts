import {ROUND_RESULT} from "./resource";

export interface Score {
  playerOne: number,
  playerTwo: number,
  roundResult: ROUND_RESULT | undefined
}
