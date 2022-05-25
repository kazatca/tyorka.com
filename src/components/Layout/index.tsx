import * as React from 'react'
import * as b_ from 'b_'
import Helmet from 'react-helmet'
import { ToTopButton } from '../ToTopButton'
import { DesktopHeader } from '../DesktopHeader'
import { MobileHeader } from '../MobileHeader'
import { Socials } from '../Socials'
import { LanguageSelector } from '../LanguageSelector'
import { useTranslate } from '../../hooks/translate'
import favicon from './static/favicon.svg'
import image from './static/image.svg'

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
      <Helmet title={t('Tyorka')}>
        <html lang={process.env.GATSBY_LNG} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href={favicon}/>
        <meta name="title" content={t('Tyorka')} />
        <meta name="description" content={t('site-description')} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tyorka.com/" />
        <meta property="og:title" content={t('Tyorka')} />
        <meta property="og:description" content={t('site-description')} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tyorka.com/" />
        <meta property="twitter:title" content={t('Tyorka')} />
        <meta property="twitter:description" content={t('site-description')} />
        <meta property="twitter:image" content={image} />
      </Helmet>
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
