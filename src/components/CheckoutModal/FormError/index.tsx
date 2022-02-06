import * as React from 'react'
import * as b_ from 'b_'
import { useTranslate } from '../../../hooks/translate'

import './index.scss'

const b = b_.with('form-error')

export const FormError: React.FC = ({ children }) => {
  const { t } = useTranslate()
  if (!children) {
    return null
  }

  return <div className={b()}>{t(children as string)}</div>
}
