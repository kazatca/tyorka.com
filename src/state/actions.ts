import {action, ActionType} from 'typesafe-actions'

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const actions = {
  addToCart: (productId: string) => action(ADD_TO_CART, {productId}),
  removeFromCart: (productId: string) => action(REMOVE_FROM_CART, {productId})
}

export type Action = ActionType<typeof actions>;