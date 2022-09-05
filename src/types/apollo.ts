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

export type Mutations = {
  __typename?: 'Mutations';
  addOrder: Order;
};


export type MutationsAddOrderArgs = {
  order: OrderInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  date: Scalars['String'];
  status: Scalars['String'];
  recipient: Recipient;
  cart: Array<Product>;
};

export type OrderInput = {
  recipient: RecipientInput;
  cart: Array<ProductInput>;
  captcha: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['String'];
  title: Scalars['String'];
  count: Scalars['Int'];
  price: Scalars['Int'];
};

export type ProductInput = {
  id: Scalars['String'];
  count?: Maybe<Scalars['Int']>;
};

export type Queries = {
  __typename?: 'Queries';
  status: Scalars['String'];
  myRole: Scalars['String'];
  product: Scalars['String'];
};


export type QueriesProductArgs = {
  id: Scalars['String'];
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
