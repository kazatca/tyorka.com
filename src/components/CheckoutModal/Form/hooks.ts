import { useRef } from 'react'
import { navigate } from 'gatsby'
import { useDispatch } from 'react-redux'
import { FORM_ERROR } from 'final-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useApolloClient } from '@apollo/client'
import { actions } from '../../../state/actions'
import { Cart } from '../types'
import { FormValues } from '.'
import mutation from './mutation.gql'
import { AddOrder, AddOrderVariables } from './mutation.types'

interface ValidationError {
  type: string
  path: string[]
}

// @translate
type ErrorMessage =
  | 'Something went wrong'
  | 'string_email'
  | 'any_required'
  | 'string_empty'

export const useForm = (cart: Cart) => {
  const apollo = useApolloClient()
  const captchaRef = useRef<ReCAPTCHA>()

  const dispatch = useDispatch()

  const submit = async (values: FormValues) => {
    const recaptchaValue = await captchaRef.current?.executeAsync()

    try {
      await apollo.mutate<AddOrder, AddOrderVariables>({
        mutation,
        variables: {
          order: {
            cart: cart.map(({ product }) => ({ id: product.id })),
            recipient: values,
            captcha: recaptchaValue!
          },
        },
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
