import { Country, Region } from './countries.interface';

type Keys = 'byCapital' | 'byCountries' | 'byRegion';

export type CacheStore = {
  [K in Keys]: K extends 'byRegion' ? RegionCountries : TermCountries;
};

interface TermCountries {
  term: string;
  countries: Array<Country>;
}

interface RegionCountries {
  region?: Region;
  countries: Array<Country>;
}
