export const getCrewAmount = (crew: string): number => {
  if (crew.includes('-')) {
    return Number(crew.split('-')[1]);
  } else {
    return Number(crew.replace(',', ''));
  }
}
