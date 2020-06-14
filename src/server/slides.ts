import * as glob from 'glob';
import * as path from 'path';
import { ProductsJson } from '../types';

interface Slide { [key: string]: string[] }

export function updateSlides(json: ProductsJson) {
  const slides: Slide = glob.sync('./src/products/*/*.jpg').reduce((result: Slide, slide) => {
    const dir = path.dirname(slide).split(path.sep).reverse()[0];
    const id = path.basename(slide);

    result[dir] = result[dir] || [];
    result[dir].push(id);
    return result;
  }, {});

  json.products.forEach(product => {
    if (!slides[product.path]) {
      return;
    }

    product.slides = slides[product.path].map(filename => {
      const slide = (product.slides || []).find(({ id }) => id === filename);
      if (!slide) {
        return {
          id: filename,
          positionX: 0,
          positionY: 0,
          size: 100
        };
      }
      return slide;
    });
  });
}
