import * as React from 'react'
import * as b_ from 'b_'
import { navigate } from 'gatsby'
import { useTranslate } from '../../hooks/translate'

import './index.scss'

import smileImg from './static/smile.svg'

const b = b_.with('thanks-page')

export const Thanks: React.FC = () => {
  const { t } = useTranslate()
  return (
    <div className={b()} onClick={() => navigate('/')}>
      <h1>{t('Thank you')}</h1>
      <img src={smileImg} alt="" />
      <div className={b('notice')}>{t('We will send you instructions')}</div>
    </div>
  )
}
