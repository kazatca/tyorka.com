import * as Types from '../../../types/apollo';

export type AddOrderVariables = Types.Exact<{
  order: Types.OrderInput;
}>;


export type AddOrder = { addOrder: { id: string } };
