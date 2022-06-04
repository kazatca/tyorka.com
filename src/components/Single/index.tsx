import 'isomorphic-fetch'
import * as React from 'react'
import * as b_ from 'b_'
import Helmet from 'react-helmet'
import { navigate } from 'gatsby'
import { SliderView } from '../Slider'
import { ProductItem } from '../../gatsby/context/products'
import { useTranslate } from '../../hooks/translate'
import { useImage } from '../../hooks/image'

import './index.scss'

import cross from './static/cross.svg'
import { useConfig } from '../../hooks/config'

const b = b_.with('single')

interface Props {
  product: ProductItem
  path: string
}

export const Single: React.FC<Props> = ({ path, product }) => {
  const { t } = useTranslate()
  const cover = useImage(product.pictures[0].src, 'small', true);
  const config = useConfig();
  const selfUrl = `${config.origin || 'https://tyorka.com'}${path}`;

  return (
    <>
      <Helmet title={`${product.title} | ${t('Tyorka')}`}>
        <meta name="description" content={product.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={selfUrl} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={cover} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={selfUrl} />
        <meta property="twitter:title" content={product.title} />
        <meta property="twitter:description" content={product.description} />
        <meta property="twitter:image" content={cover} />
      </Helmet>

      <section className={b()}>
        <div className={b('close')} onClick={() => navigate('/')}>
          <img src={cross} />
        </div>
        <SliderView pictures={product.pictures} />
        <section className={b('section')}>
          <div className={b('title')}>{product.title}</div>
          <div
            className={b('description')}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      </section>
      
    </>
  )
};