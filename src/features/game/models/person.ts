export interface PersonResource {
  properties: Person;
  description: string;
  uid: string;
}

export interface Person {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: Date;
  edited: Date;
  name: string;
  homeworld: string;
  url: string;
}

export interface PeopleDueler {
  data: { personOne: Person; personTwo: Person; } | null;
  isLoading: boolean;
}
