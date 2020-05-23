import {action, ActionType} from 'typesafe-actions'
import { CheckoutFields } from '../types';

export const CHANGE_LANGUAGE = 'APP/CHANGE_LANGUAGE';

export const ADD_TO_CART = 'CART/ADD';
export const REMOVE_FROM_CART = 'CART/REMOVE';
export const CLEAN_CART = 'CART/CLEAN';

export const SET_FIELD = 'CHECKOUT/SET_FIELD';

export const actions = {
  changeLanguage: (lng: string) => action(CHANGE_LANGUAGE, {lng}),

  addToCart: (productId: string) => action(ADD_TO_CART, {productId}),
  removeFromCart: (productId: string) => action(REMOVE_FROM_CART, {productId}),
  cleanCart: () => action(CLEAN_CART),

  setField: (name: CheckoutFields, value: string) => action(SET_FIELD, {name, value})
}

export type Action = ActionType<typeof actions>;