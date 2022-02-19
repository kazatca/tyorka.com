import * as React from 'react'
import * as b_ from 'b_'
import { Link } from './Link'
import './index.scss'

import insta from './static/insta.svg'
import etsy from './static/etsy.png'
import fb from './static/fb.png'
import vk from './static/vk.png'

const b = b_.with('socials')

export const Socials = () => (
  <section className={b()}>
    <Link href="https://www.instagram.com/tyorka" icon={insta} alt="insta" />
    <Link href="https://www.etsy.com/shop/tyorka" icon={etsy} alt="etsy" />
    <Link href="https://www.facebook.com/tyorka" icon={fb} alt="fb" />
    <Link href="https://vk.com/tyorkaa" icon={vk} alt="fb" />
  </section>
)
