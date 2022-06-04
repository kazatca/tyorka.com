import 'isomorphic-fetch'
import * as React from 'react'
import * as b_ from 'b_'
import Helmet from 'react-helmet'
import { navigate } from 'gatsby'
import { SliderView } from '../Slider'
import { ProductItem } from '../../gatsby/context/products'
import { useTranslate } from '../../hooks/translate'

import './index.scss'

import cross from './static/cross.svg'

const b = b_.with('single')

interface Props {
  product: ProductItem
}

export const Single: React.FC<Props> = ({ product }) => {
  const { t } = useTranslate()
  return (
    <>
      <Helmet title={`${product.title} | ${t('Tyorka')}`}>
        <meta name="description" content={product.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tyorka.com/" />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.pictures[0].src} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tyorka.com/" />
        <meta property="twitter:title" content={product.title} />
        <meta property="twitter:description" content={product.description} />
        <meta property="twitter:image" content={product.pictures[0].src} />
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