import Koa from 'koa';
import * as fs from 'fs';
import koaBody from 'koa-body';
import { ProductsJson } from '../types';
import { updateSlides } from './slides';
import { updateProducts } from './products';
import { fillDescriptions } from './descriptions';

function saveJson(json: object) {
  fs.writeFileSync('./src/products/.~products.json', JSON.stringify(json, null, 2));
  fs.renameSync('./src/products/.~products.json', './src/products/products.json');
}
const json: ProductsJson = require('../products/products.json');

const app = new Koa();

app.use(koaBody());

app.use(async ctx => {
  if(ctx.request.headers.origin) {
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', ctx.request.headers.origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (ctx.request.method === 'OPTIONS') {
    ctx.body = '';
    ctx.status = 204;
    return;
  }


  const json: ProductsJson = require('../products/products.json');
  const [_, name, ...parts] = ctx.request.url.split('/').map(decodeURIComponent);

  if (name === 'gallery' && ctx.request.method === 'POST') {
    json.gallery = ctx.request.body;
    saveJson(json);
    ctx.status = 200;
    return;
  }

  
  if (parts[0] === 'slide' && ctx.request.method === 'POST') {
    const product = json.products.find(product => product.path === name);
    if (!product) {
      ctx.status = 404;
      return;
    }
    const slide = (product.slides || []).find(slide => slide.id === parts[1]);
    if (!slide) {
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

updateProducts(json);
updateSlides(json);
saveJson(json);
fillDescriptions();
