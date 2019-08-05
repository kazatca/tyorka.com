import Koa from 'koa';
// import Router from 'koa-router';
import { Product } from './types';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import koaBody from 'koa-body';

interface Slide {[key: string]: string[]}

function saveJson(json: object){
  fs.writeFileSync('./src/products/.~products.json', JSON.stringify(json, null, 2));
  fs.renameSync('./src/products/.~products.json', './src/products/products.json');
}

function updateProductsJson(){
  const json: {products: Product[]} = require('../products/products.json');

  const slides: Slide = glob.sync('./src/products/*/*').reduce((result: Slide, slide) => {
    const dir = path.dirname(slide).split(path.sep).reverse()[0];
    const id = path.basename(slide);

    result[dir] = result[dir] || [];
    result[dir].push(id);
    return result;
  }, {});

  json.products.forEach(product => {
    if(!slides[product.path]){
      return;
    }

    product.slides = slides[product.path].map(filename => {
      const slide = product.slides.find(({id}) => id === filename);
      if(!slide){
        return {id: filename};
      }
      return slide;
    });
  });

  saveJson(json);
}

const app = new Koa();

app.use(koaBody());

app.use(async ctx => {
  if(ctx.request.method === 'OPTIONS'){
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8000');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.body = '';
    ctx.status = 204;
    return;
  }
  const json: {products: Product[]} = require('../products/products.json');
  const [_, name, ...parts] = ctx.request.url.split('/').map(decodeURIComponent);
  const product = json.products.find(product => product.path === name);
  if(!product){
    ctx.status = 404;
    return;
  }

  if(parts[0] === 'slide' && ctx.request.method === 'POST'){
    const slide = product.slides.find(slide => slide.id === parts[1]);
    if(!slide){
      ctx.status = 404;
      return;
    }
    Object.assign(slide, ctx.request.body);
    saveJson(json);
    ctx.status = 200;
    return;
  }

})


app.listen(3000);
console.log('listening on port 3000');

updateProductsJson();