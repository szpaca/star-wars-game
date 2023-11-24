export interface StarshipResource {
  properties: Starship;
  description: string;
  uid: string;
}

export interface Starship {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: any[];
  created: Date;
  edited: Date;
  name: string;
  url: string;
}

export interface StarshipDueler {
  data: { starshipOne: Starship; starshipTwo: Starship; } | null;
  isLoading: boolean;
}
