import * as React from 'react'
import * as b_ from 'b_'

import './index.scss';

const b = b_.with('links-link');

interface Props {
  href: string;
  title: string
  subtitle?: string
}

export const Link: React.FC<Props> = ({href, title, subtitle}) => (
  <a className={b()} href={href}>
    <h3 className={b('title')}>{title}</h3>
    {subtitle && <p className={b('subtitle')}>{subtitle}</p>}
  </a>
)
