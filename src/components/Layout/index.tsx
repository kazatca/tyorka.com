import * as React from 'react'
import * as b_ from 'b_';
import Helmet from 'react-helmet'
import DesktopHeader from '../DesktopHeader'
import MobileHeader from '../MobileHeader'
import Socials from '../Socials';
import { LanguageSelector } from '../LanguageSelector';

import './index.scss';

const b = b_.with('content');

const fixedMenu = false;

const Layout: React.FC<{}> = ({ children }) => (
  <>
    <Helmet
      title='Тёрка'
    >
      <html lang="ru" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    </Helmet>
    <div className={b({'fixed-menu': fixedMenu})}>
      <DesktopHeader fixed={fixedMenu}/>
      <MobileHeader />
      {children}
      <Socials />
      <LanguageSelector />
    </div>
  </>
)

export default Layout
