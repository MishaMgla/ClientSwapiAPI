export interface PeopleResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Response {
  count: string;
  results: PeopleResponse[];
}

export type NameUrl = {
  name: string;
  url: string;
};

export interface PeopleDetails
  extends Omit<PeopleResponse, "films" | "species" | "vehicles" | "starships"> {
  films: NameUrl[];
  species: NameUrl[];
  vehicles: NameUrl[];
  starships: NameUrl[];
}

export interface SearchResult {
  name: string;
  id: string;
}
