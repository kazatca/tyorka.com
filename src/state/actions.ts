import {action, ActionType} from 'typesafe-actions'

export const ADD_TO_CART = 'ADD_TO_CART';

export const actions = {
  addToCart: (productId: number) => action(ADD_TO_CART, {productId})
}

export type Action = ActionType<typeof actions>;