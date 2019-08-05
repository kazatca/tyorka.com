import * as React from 'react'
import * as b_ from 'b_'

import './index.scss';

import * as insta from './static/insta.svg';
import * as etsy from './static/etsy.png';
import * as fb from './static/fb.png';
import * as vk from './static/vk.png';

const b = b_.with('socials');

const Socials = () =>
  <section className={b("")}>
    <a className={b("link")} href="https://www.instagram.com/tyorka_store" target="_blank">
      <img src={insta} alt="insta" />
    </a>
    <a className={b("link")} href="https://www.etsy.com/shop/tyorka" target="_blank">
      <img src={etsy} alt="etsy" />
    </a>
    <a className={b("link")} href="https://www.facebook.com/tyorkaa" target="_blank">
      <img src={fb} alt="fb" />
    </a>
    <a className={b("link")} href="https://vk.com/tyorkaa" target="_blank">
      <img src={vk} alt="fb" />
    </a>
  </section>

export default Socials;