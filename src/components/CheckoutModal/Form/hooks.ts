import { useRef } from 'react'
import { navigate } from 'gatsby'
import { useDispatch } from 'react-redux'
import { FORM_ERROR } from 'final-form'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import { useConfig } from '../../../hooks/config'
import { actions } from '../../../state/actions'
import { Cart } from '../types'
import { FormValues } from '.'

interface ValidationError {
  type: string
  path: string[]
}

// @translate
type ErrorMessage = 'Something went wrong' | 'string_email' | 'any_required' | 'string_empty'

export const useForm = (cart: Cart) => {
  const captchaRef = useRef<ReCAPTCHA>()
  const { api } = useConfig()

  const dispatch = useDispatch()

  const submit = async (values: FormValues) => {
    const recaptchaValue = await captchaRef.current?.executeAsync()

    try {
      await axios.post(`${api.url}/order`, {
        captcha: recaptchaValue,
        cart: cart.map(({ product }) => product.id),
        recepient: values,
      })
    } catch (e) {
      if (e.response?.data?.details) {
        return toFormError(e.response?.data?.details)
      }
      return { [FORM_ERROR]: 'Something went wrong' }
    }

    dispatch(actions.cleanCart())
    navigate('/success')
  }

  return {
    captchaRef,
    submit,
  }
}

const toFormError = (errors: ValidationError[]) =>
  errors.reduce((result, { path, type }) => {
    result[path[path.length - 1]] = type.replace(/\./g, '_') as ErrorMessage
    return result
  }, {} as Record<string, ErrorMessage>)
