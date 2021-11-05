import { initializeApp, database as FBDB } from "firebase/app";
import { v4 as uuid } from "uuid";
import { ShopItem } from "../../hooks/shop";
// import "firebase/database";
// import "firebase/auth";

var firebaseConfig = {
  apiKey: 'AIzaSyBe73J6yTbF-iULtbIVs8bcoHCehsZPnig',
  authDomain: 'tyorka-com.firebaseapp.com',
  databaseURL: 'https://tyorka-com.firebaseio.com',
  projectId: 'tyorka-com',
  storageBucket: 'tyorka-com.appspot.com',
  messagingSenderId: '1020162780981',
  appId: '1:1020162780981:web:f735d6c6cb58ef1bdd667c',
}

let database: FBDB.Database | null = null;

function init(){
  if(typeof window !== 'undefined' && !database){
    const app = initializeApp(firebaseConfig);
    database = app.database();
  }

  return database;
}

export interface Cart {
  product: ShopItem
  count: number
}

export function addOrder(name: string, email: string, cart: Cart[]) {
  const database = init();

  if(!database){
    return;
  }
  return database.ref('order/' + uuid()).set({name, email, cart, date: new Date().toISOString()});
}