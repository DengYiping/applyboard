import { IPosition } from 'app/shared/model/position.model';

export interface ICompany {
  id?: number;
  name?: string;
  field?: string;
  positions?: IPosition[];
}

export const defaultValue: Readonly<ICompany> = {};
