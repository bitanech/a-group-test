export interface SomeFeatureFilter {
  city: number;
  price: number[];
  categories: {
    id: number,
    name: string,
    selected: boolean
  }[];
}
