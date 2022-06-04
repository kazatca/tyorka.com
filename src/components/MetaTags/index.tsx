import * as React from 'react'
import Helmet from 'react-helmet'
import { useTranslate } from '../../hooks/translate'
import { useImage } from '../../hooks/image'
import { useConfig } from '../../hooks/config'

import defaultImage from './static/image.jpg'

interface Props {
  path: string
  title?: string
  description: string
  image?: string
}

export const MetaTags: React.FC<Props> = ({ path, title, description, image }) => {
  const { t } = useTranslate()
  const cover = useImage(image, 'small', true) || defaultImage;
  const config = useConfig();
  const selfUrl = `${config.origin || 'https://tyorka.com'}${path}`;
  const completeTitle = title ? `${title} | ${t('Tyorka')}`: t('Tyorka');

  return (
      <Helmet title={completeTitle}>
        <meta name="title" content={completeTitle} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={selfUrl} />
        <meta property="og:title" content={completeTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={cover} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={selfUrl} />
        <meta property="twitter:title" content={completeTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={cover} />
      </Helmet>

  )
};