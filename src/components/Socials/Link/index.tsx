import * as React from 'react'
import * as b_ from 'b_'

import './index.scss'

const b = b_.with('socials-link')

interface Props {
  href: string
  icon: string
  alt: string
}

export const Link: React.FC<Props> = ({href, icon, alt}) => (
  <a
    className={b()}
    href={href}
    target="_blank"
  >
    <img src={icon} alt={alt} />
  </a>
)
