import {Result} from "../../../shared/models/general.interface";

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

