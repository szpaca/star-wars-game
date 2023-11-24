import {getCrewAmount, getNewScore, getRandomResultUrl} from "./game-utils";
import {mockResults} from "../../../shared/mocks/game.mocks";
import {ROUND_RESULT} from "../models/resource";

describe('GameUtils', () => {
  it('should call getCrewAmount and return crew amount as number', () => {
    const crewAmountStringRange = '30-165';
    expect(getCrewAmount(crewAmountStringRange)).toBe(165);
  });

  it('should call getCrewAmount and return crew amount as number', () => {
    const crewAmountStringWithComma = '40,500';
    expect(getCrewAmount(crewAmountStringWithComma)).toBe(40500);
  });

  it('should call getRandomResultUrl get random url from array of results', () => {
    const mockMath = Object.create(window.Math);
    mockMath.random = () => 0.5;
    window.Math = mockMath;
    expect(getRandomResultUrl(mockResults)).toEqual('testUrl3');
  });

  it('should call getCrewAmount and calculate new score and mark player one as winner', () => {
    expect(
      getNewScore(200, 100, {playerOne: 1, playerTwo: 5, roundResult: ROUND_RESULT.PLAYER_TWO}))
      .toEqual({playerOne: 2, playerTwo: 5, roundResult: ROUND_RESULT.PLAYER_ONE});
  });

  it('should call getCrewAmount and calculate new score and mark player two as winner', () => {
    expect(
      getNewScore(10, 500, {playerOne: 5, playerTwo: 10, roundResult: ROUND_RESULT.PLAYER_ONE}))
      .toEqual({playerOne: 5, playerTwo: 11, roundResult: ROUND_RESULT.PLAYER_TWO});
  });

  it('should call getCrewAmount and calculate new score and set draw', () => {
    expect(
      getNewScore(100, 100, {playerOne: 1, playerTwo: 5, roundResult: ROUND_RESULT.PLAYER_TWO}))
      .toEqual({playerOne: 1, playerTwo: 5, roundResult: ROUND_RESULT.DRAW});
  });
});
