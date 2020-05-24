import { ProductsJson } from "../../types";

const json: ProductsJson = require('../../products/products.json');

export type Product = ProductsJson['products'][number];

export const products = json.gallery.map(id => json.products.find(product => product.id === id)) as Product[]
