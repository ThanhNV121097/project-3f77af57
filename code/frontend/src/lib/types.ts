/** A place in the guide, as the pages read it from src/data/destinations.json. */
export interface Destination {
  id: string;
  name: string;
  region: string;
  kind: string;
  image: string;
  known_for: string;
  best_months: string;
  best_note: string;
  avoid: string;
  avoid_months: number[];
  getting_there: string;
  airport: string;
  distance_km: number;
  hours: number;
  days: number;
  opinion: string;
}

/** A region or a kind of place: the two ways the index narrows. */
export interface Facet {
  id: string;
  name: string;
  note: string;
}
