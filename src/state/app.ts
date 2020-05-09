import { Action, CHANGE_LANGUAGE } from './actions';

interface State {
  locale: string
}

const initialState: State = {
  locale: 'ru'
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGE_LANGUAGE: 
      return {
        ...state,
        locale: action.payload.lng
      }
    default:
      return state;
  }
};