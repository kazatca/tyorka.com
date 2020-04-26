import * as firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: 'AIzaSyBe73J6yTbF-iULtbIVs8bcoHCehsZPnig',
  authDomain: 'tyorka-com.firebaseapp.com',
  databaseURL: 'https://tyorka-com.firebaseio.com',
  projectId: 'tyorka-com',
  storageBucket: 'tyorka-com.appspot.com',
  messagingSenderId: '1020162780981',
  appId: '1:1020162780981:web:f735d6c6cb58ef1bdd667c',
}

const app = firebase.initializeApp(firebaseConfig);

const database = app.database();

function getOrderId() {
  return Date.now() + '_' + ('' + Math.random()).slice(2);
}

export interface Cart {
  name: string,
  count: number
}

export function addOrder(name: string, email: string, cart: Cart[]) {
  return database.ref('order/' + getOrderId()).set({name, email, cart});
}