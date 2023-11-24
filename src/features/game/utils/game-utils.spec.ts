import {getCrewAmount, getRandomResultUrl} from "./game-utils";
import {mockResults} from "../../../shared/mocks/game.mocks";

describe('GameUtils', () => {
  it('should return crew amount as number', () => {
    const crewAmountStringRange = '30-165';
    expect(getCrewAmount(crewAmountStringRange)).toBe(165);
  });

  it('should return crew amount as number', () => {
    const crewAmountStringWithComma = '40,500';
    expect(getCrewAmount(crewAmountStringWithComma)).toBe(40500);
  });


  it('should get random url from array of results', () => {
    const mockMath = Object.create(window.Math);
    mockMath.random = () => 0.5;
    window.Math = mockMath;


    expect(getRandomResultUrl(mockResults)).toEqual('testUrl3');
  });
});
