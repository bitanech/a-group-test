import { DataBase } from './data-base';

export interface Data extends DataBase {
  readonly city: number;
  readonly category: number;
  readonly price: number;
}
