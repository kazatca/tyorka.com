import * as React from 'react'
import * as b_ from 'b_'
import { Link } from './Link'
import { ShortLink } from './ShortLink'
import { useTranslate } from '../../hooks/translate'
import { LanguageSelector } from '../LanguageSelector'

import './index.scss'

import insta from './static/insta.png'
import tg from './static/tg.png'
import vk from './static/vk.png'

const b = b_.with('links')

export const Links = () => {
  const { t } = useTranslate()
  return (
    <div className={b()}>
      <div className={b('shorts')}>
        <ShortLink href="https://www.instagram.com/tyorka/" icon={insta} />
        <ShortLink href="https://t.me/kaptyorka" icon={tg} />
        <ShortLink href="https://vk.com/tina_tyorka" icon={vk} />
      </div>
      <Link href="/" title={t('Site')} subtitle={t('Portfolio and shop')} />
      <Link
        href="https://vk.com/tyorkaa"
        title={t('VKontakte')} 
        subtitle={t('Learning articles and life stories')}
      />
      <Link
        href="https://boosty.to/tyorka"
        title="Boosty"
        subtitle={t('For those who want to read articles')}
      />
      <Link
        href="mailto://tyorkaa@gmail.com"
        title={t('Email me')}
      />
      <div className={b('language-selector')}>
        <LanguageSelector isDark/>
      </div>
    </div>
  )
}
