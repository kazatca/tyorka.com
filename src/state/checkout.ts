import { SET_FIELD, Action } from './actions';
import { CheckoutFields } from '../types';

type State = {
  [key in CheckoutFields]: string
}

const initialState: State = {
  name: '',
  email: ''
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return state;
  }
};