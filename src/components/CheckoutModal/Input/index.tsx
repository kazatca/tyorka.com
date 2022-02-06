import * as React from 'react'
import * as b_ from 'b_'
import { Field } from 'react-final-form'
import { useTranslate } from '../../../hooks/translate'

import './index.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  title: string
}

const b = b_.with('form-input')

export const Input: React.FC<Props> = ({ name, title, ...props }) => {
  const { t } = useTranslate()
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className={b()}>
          <input placeholder={title} {...props} {...input} />
          {(meta.submitError || meta.error) && (
            <div className={b('error')}>
              {t(meta.submitError || meta.error)}
            </div>
          )}
        </div>
      )}
    </Field>
  )
}
