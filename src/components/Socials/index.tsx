import * as React from 'react'
import * as b_ from 'b_'
import { Link } from './Link'
import './index.scss'

import insta from './static/insta.png'
import tg from './static/tg.png'
import vk from './static/vk.png'

const b = b_.with('socials')

export const Socials = () => (
  <section className={b()}>
    <Link href="https://www.instagram.com/tyorka" icon={insta} alt="insta" />
    <Link href="https://t.me/kaptyorka" icon={tg} alt="tg" />
    <Link href="https://vk.com/tyorkaa" icon={vk} alt="vk" />
  </section>
)
