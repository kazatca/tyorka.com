import * as b_ from 'b_'
import { createPersistDecorator } from 'final-form-persist'
import * as React from 'react'
import { Form } from 'react-final-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { CURRENCY } from '../../../consts'
import { useConfig } from '../../../hooks/config'
import { useTranslate } from '../../../hooks/translate'
import { FormError } from '../FormError'
import { Input } from '../Input'
import { Loading } from '../Loader'
import { RecaptchaTerms } from '../RecaptchaTerms'
import { Cart } from '../types'
import { useForm } from './hooks'
import './index.scss'

interface Props {
  cart: Cart
  total: number
}

export interface FormValues {
  name: string
  email: string
}

const b = b_.with('checkout-form')

export const CheckoutForm: React.FC<Props> = ({ cart, total }) => {
  const { t } = useTranslate()
  const { captcha } = useConfig()
  const { captchaRef, submit } = useForm(cart)

  const { persistDecorator } = createPersistDecorator({
    name: 'checkout',
    debounceTime: 500,
    whitelist: ['name', 'email'],
  })

  return (
    <Form<FormValues>
      decorators={[persistDecorator]}
      onSubmit={submit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form className={b({ submitting })} onSubmit={handleSubmit}>
          <ReCAPTCHA
            //@ts-ignore
            ref={captchaRef}
            sitekey={captcha.key}
            size="invisible"
          />
          <Input name="name" title={t('Name')} autoFocus />
          <Input name="email" title="Email" /*type="email"*/ />
          <RecaptchaTerms />
          <FormError>{submitError}</FormError>
          <div className={b('footer')}>
            <div className={b('total')}>
              {t('Amounting to')}: {total} {CURRENCY}
            </div>
            <button type="submit" className={b('btn')}>
              {t('Send')}
            </button>
          </div>
          {submitting && <Loading />}
        </form>
      )}
    />
  )
}
