import {Person, PersonResource} from "../../features/game/models/person";
import {Starship, StarshipResource} from "../../features/game/models/starship";
import {Result} from "../models/general.interface";

export const mockResultResponse = {
  message: 'ok',
  total_records: 1,
  total_pages: 1,
  previous: null,
  next: null,
  results: [{url: 'test.com', name: 'testName', uid: '1'}]
};

export const mockPerson: Person = {
  name: 'personTestName',
  url: 'testUrl1',
  mass: '100',
  height: 'personTestHeight',
  hair_color: 'personTestHeir',
  skin_color: 'personTestSkin',
  eye_color: 'personTestEye',
  birth_year: 'personTestYear',
  gender: 'personTestGender',
  created: new Date(),
  edited: new Date(),
  homeworld: 'personTestHomeworld',
};

export const mockStarship: Starship = {
  name: 'starshipTestName',
  url: 'testUrl1',
  created: new Date(),
  edited: new Date(),
  model: 'starshipTestModel',
  starship_class: 'starshipTestClass',
  manufacturer: 'starshipTestManu',
  cost_in_credits: 'starshipTestCost',
  length: 'starshipTestLength',
  crew: '100',
  passengers: 'starshipTestPass',
  max_atmosphering_speed: 'starshipTestSpeed',
  hyperdrive_rating: 'starshipTestHyper',
  MGLT: 'starshipTesMGLTt',
  cargo_capacity: 'starshipTestCargo',
  consumables: 'starshipTestCons',
  pilots: [],
};

export const mockPersonResource: PersonResource = {
  properties: mockPerson,
  uid: '1',
  description: 'testDesc'
};

export const mockStarshipResource: StarshipResource = {
  properties: mockStarship,
  uid: '1',
  description: 'testDesc'
};

export const mockResults: Result[] = [
  {uid: '1', url: 'testUrl1', name: 'testName1'},
  {uid: '2', url: 'testUrl2', name: 'testName2'},
  {uid: '3', url: 'testUrl3', name: 'testName3'},
  {uid: '4', url: 'testUrl4', name: 'testName4'},
  {uid: '5', url: 'testUrl5', name: 'testName5'}
];
