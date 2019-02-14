import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInterview, defaultValue } from 'app/shared/model/interview.model';

export const ACTION_TYPES = {
  FETCH_INTERVIEW_LIST: 'interview/FETCH_INTERVIEW_LIST',
  FETCH_INTERVIEW: 'interview/FETCH_INTERVIEW',
  CREATE_INTERVIEW: 'interview/CREATE_INTERVIEW',
  UPDATE_INTERVIEW: 'interview/UPDATE_INTERVIEW',
  DELETE_INTERVIEW: 'interview/DELETE_INTERVIEW',
  RESET: 'interview/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInterview>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InterviewState = Readonly<typeof initialState>;

// Reducer

export default (state: InterviewState = initialState, action): InterviewState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INTERVIEW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTERVIEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INTERVIEW):
    case REQUEST(ACTION_TYPES.UPDATE_INTERVIEW):
    case REQUEST(ACTION_TYPES.DELETE_INTERVIEW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INTERVIEW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTERVIEW):
    case FAILURE(ACTION_TYPES.CREATE_INTERVIEW):
    case FAILURE(ACTION_TYPES.UPDATE_INTERVIEW):
    case FAILURE(ACTION_TYPES.DELETE_INTERVIEW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERVIEW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERVIEW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INTERVIEW):
    case SUCCESS(ACTION_TYPES.UPDATE_INTERVIEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INTERVIEW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/interviews';

// Actions

export const getEntities: ICrudGetAllAction<IInterview> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INTERVIEW_LIST,
  payload: axios.get<IInterview>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInterview> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INTERVIEW,
    payload: axios.get<IInterview>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInterview> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INTERVIEW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInterview> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INTERVIEW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInterview> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INTERVIEW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
