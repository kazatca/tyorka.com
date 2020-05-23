import * as React from 'react'
import * as b_ from 'b_'
import { useTranslate } from '../../hooks/translate'

import './index.scss'

import * as smileImg from './static/smile.svg'
import { push } from 'gatsby'

const b = b_.with('thanks-page');

export const Thanks = () => {
  const { t } = useTranslate()
  return (
    <div className={b()} onClick={() => push('/')}>
      <h1>{t('Thank you')}</h1>
      <img src={smileImg} alt="" />
      <div className={b('notice')}>{t('We will send you instructions')}</div>
    </div>
  )
}
