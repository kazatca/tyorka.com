import * as path from 'path';
import * as fs from 'fs';


const root = './src/products';

function createMD(name: string, lng: string){
  const fileName = path.resolve(root, name);
  if(fs.existsSync(fileName)){
    return;
  }
  const content = `---
path: "${name}",
title: ""
---

`;
  fs.writeFileSync(fileName, content);
}

export function fillDescriptions() {
  const productFolders = fs.readdirSync(root);
  productFolders.forEach(name => {
    ['en', 'ru'].forEach(lng => createMD(name, lng))
  })
}

fillDescriptions();