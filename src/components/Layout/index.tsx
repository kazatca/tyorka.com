import * as React from 'react'
import * as b_ from 'b_'
import Helmet from 'react-helmet'
import { ToTopButton } from '../ToTopButton'
import { DesktopHeader } from '../DesktopHeader'
import { MobileHeader } from '../MobileHeader'
import { Socials } from '../Socials'
import { LanguageSelector } from '../LanguageSelector'
import { useTranslate } from '../../hooks/translate'
import { MetaTags } from '../MetaTags'

import favicon from './static/favicon.svg'

import './index.scss'

const b = b_.with('content')

const fixedMenu = false

interface Props {
  noHeaderOnDesktop?: boolean
}

export const Layout: React.FC<Props> = ({ children, noHeaderOnDesktop }) => {
  const { t } = useTranslate()
  return (
    <>
      <Helmet>
        <html lang={process.env.GATSBY_LNG} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href={favicon}/>
      </Helmet>
      <MetaTags
        path=''
        description={t('site-description')}
      />
      <div className={b({ 'fixed-menu': fixedMenu })}>
        {!noHeaderOnDesktop && <DesktopHeader fixed={fixedMenu} />}
        <MobileHeader />
        {children}
        <Socials />
        <LanguageSelector />
        <ToTopButton />
      </div>
    </>
  )
}
