import { IInterview } from 'app/shared/model/interview.model';
import { IUser } from 'app/shared/model/user.model';
import { IPosition } from 'app/shared/model/position.model';

export const enum ApplicationStatus {
  PREPARING = 'PREPARING',
  APPLIED = 'APPLIED',
  SCHEDULED = 'SCHEDULED',
  INTERVIEWED = 'INTERVIEWED',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED'
}

export const enum ApplicationDecision {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
  WITHDRAW = 'WITHDRAW'
}

export interface IApplication {
  id?: number;
  status?: ApplicationStatus;
  decision?: ApplicationDecision;
  remark?: string;
  interviews?: IInterview[];
  user?: IUser;
  position?: IPosition;
}

export const defaultValue: Readonly<IApplication> = {};
