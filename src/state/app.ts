import { Action } from './actions';

interface State {
  locale: string
}

const initialState: State = {
  locale: 'ru'
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    default:
      return state;
  }
};