import {Result} from "../../../shared/models/general.interface";
import {ROUND_RESULT} from "../models/resource";
import {Score} from "../models/score";

export const getCrewAmount = (crew: string): number => {
  if (crew.includes('-')) {
    return Number(crew.split('-')[1]);
  } else {
    return Number(crew.replace(',', ''));
  }
};

export const getRandomResultUrl = (array: Result[]): string => {
  return array[Math.floor(Math.random() * array.length)].url;
};

export const getNewScore = (playerOneResult: number, playerTwoResult: number, score: Score): Score => {
  const newScore: Score = {...score};
  if (playerOneResult > playerTwoResult) {
    return {
      ...score,
      playerOne: newScore.playerOne + 1,
      roundResult: ROUND_RESULT.PLAYER_ONE
    };
  } else if (playerOneResult < playerTwoResult) {
    return {
      ...score,
      playerTwo: newScore.playerTwo + 1,
      roundResult: ROUND_RESULT.PLAYER_TWO
    };
  } else {
    return {
      ...score,
      roundResult: ROUND_RESULT.DRAW
    };
  }
};
