import * as React from 'react'
import * as b_ from 'b_'

import './index.scss'

const b = b_.with('recaptcha-terms')

export const RecaptchaTerms: React.FC = () => (
  <div className={b()}>
    This site is protected by reCAPTCHA and the Google{' '}
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </div>
)
