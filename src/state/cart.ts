import { ADD_TO_CART, Action } from './actions';

interface CartItem {
  id: number
  count: number
}

interface State {
  items: CartItem[]
}

const initialState: State = {
  items: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ADD_TO_CART:
      if(state.items.some(item => item.id === action.payload.productId)){
        return state;
      }
      return { 
        items: [...state.items, {id: action.payload.productId, count: 1}]
      };
    default:
      return state;
  }
};