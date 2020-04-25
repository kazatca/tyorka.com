import { ADD_TO_CART, REMOVE_FROM_CART, Action } from './actions';

interface CartItem {
  id: string
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
    case REMOVE_FROM_CART:
      return { 
        items: state.items.filter(item => item.id !== action.payload.productId)
      };
    default:
      return state;
  }
};