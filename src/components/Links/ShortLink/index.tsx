import * as React from 'react'
import * as b_ from 'b_'

import './index.scss';

const b = b_.with('links-short-link');

interface Props {
  href: string;
  icon: string
}

export const ShortLink: React.FC<Props> = ({href, icon}) => (
  <a className={b()} href={href} target="_blank">
    <img src={icon} alt="" />
  </a>
)
