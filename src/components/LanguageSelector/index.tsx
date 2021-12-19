import * as React from 'react'
import * as b_ from 'b_'
import { Lng } from '../../types'

import './index.scss'

const locales: Lng[] = ['en', 'ru']

const b = b_.with('language-selector')

const actualLng = process.env.GATSBY_LNG || 'ru'

const set = (lng: Lng) => {
  document.cookie = `locale=${lng};expires=${(new Date(Date.now()+ 2*365*86400*1000)).toUTCString()};path=/`
  window.location.reload()
}

export const LanguageSelector: React.FC = () => (
  <div className={b()}>
    {locales.map(lng => (
      <span
        key={lng}
        className={b('lng', { active: lng === actualLng })}
        onClick={() => set(lng)}
      >
        {lng.toUpperCase()}
      </span>
    ))}
  </div>
)
