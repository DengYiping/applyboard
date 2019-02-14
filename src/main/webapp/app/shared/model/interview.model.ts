import { IApplication } from 'app/shared/model/application.model';

export const enum InterviewType {
  HR = 'HR',
  CODING = 'CODING',
  MANAGER = 'MANAGER',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN'
}

export interface IInterview {
  id?: number;
  round?: number;
  detail?: string;
  type?: InterviewType;
  application?: IApplication;
}

export const defaultValue: Readonly<IInterview> = {};
