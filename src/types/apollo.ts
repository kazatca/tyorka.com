export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  count: Scalars['Int'];
  price: Scalars['Float'];
};

export type CartItemInput = {
  id: Scalars['ID'];
  /** Ignored for now */
  count?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addOrder: Order;
};


export type MutationAddOrderArgs = {
  order: NewOrder;
};

export type NewOrder = {
  recipient: RecipientInput;
  cart: Array<CartItemInput>;
  captcha: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  date: Scalars['String'];
  status: OrderStatus;
  cart: Array<CartItem>;
  recipient: Recipient;
};

export enum OrderStatus {
  Created = 'CREATED',
  Canceled = 'CANCELED',
  Paid = 'PAID',
  Shipped = 'SHIPPED',
  Finished = 'FINISHED'
}

export type Query = {
  __typename?: 'Query';
  orders: Array<Order>;
};

export type Recipient = {
  __typename?: 'Recipient';
  name: Scalars['String'];
  email: Scalars['String'];
};

export type RecipientInput = {
  name: Scalars['String'];
  email: Scalars['String'];
};
