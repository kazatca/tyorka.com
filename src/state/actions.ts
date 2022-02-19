import {action, ActionType} from 'typesafe-actions'

export const ADD_TO_CART = 'CART/ADD';
export const REMOVE_FROM_CART = 'CART/REMOVE';
export const CLEAN_CART = 'CART/CLEAN';

export const actions = {
  addToCart: (productId: string) => action(ADD_TO_CART, {productId}),
  removeFromCart: (productId: string) => action(REMOVE_FROM_CART, {productId}),
  cleanCart: () => action(CLEAN_CART),
}

export type Action = ActionType<typeof actions>;