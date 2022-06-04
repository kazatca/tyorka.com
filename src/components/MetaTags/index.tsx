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
  price?: number
}

const DESC_LEN = 160;

export const MetaTags: React.FC<Props> = ({ path, image, price, ...props }) => {
  const { t } = useTranslate()
  const cover = useImage(image, 'small', true) || defaultImage;
  const config = useConfig();
  const selfUrl = `${config.origin || 'https://tyorka.com'}${path}/`.replace(/\/+$/, '/');
  const title = props.title ? `${props.title} | ${t('Tyorka')}` : t('Tyorka');
  const description = (
    props.description.length > DESC_LEN
      ? props.description.substring(0, DESC_LEN - 3) + '...'
      : props.description
  );

  return (
    <>
      <Helmet title={title}>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content={price ? 'product' : "website"} />
        <meta property="og:url" content={selfUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={cover} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={selfUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={cover} />
      </Helmet>
      {price &&
        <Helmet>
          <meta property="product:price:amount" content={price?.toFixed(2)} />
          <meta property="product:price:currency" content="RUB" />
        </Helmet>
      }
    </>

  )
};
