import { Moment } from 'moment';
import { IApplication } from 'app/shared/model/application.model';
import { ICompany } from 'app/shared/model/company.model';

export interface IPosition {
  id?: number;
  title?: string;
  salary?: number;
  startDate?: Moment;
  location?: string;
  applications?: IApplication[];
  company?: ICompany;
}

export const defaultValue: Readonly<IPosition> = {};
