import * as React from 'react'
import Helmet from 'react-helmet'
import DesktopHeader from '../DesktopHeader'
import MobileHeader from '../MobileHeader'

import './index.scss';

const Layout = ({ children }) => (
    <>
      <Helmet
        title='Тёрка'
      >
        <html lang="ru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
      </Helmet>
      <div className="content">
        <DesktopHeader />
        <MobileHeader />
        {children}
      </div>
    </>
)

export default Layout
