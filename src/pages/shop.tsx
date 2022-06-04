import * as React from 'react'
import { Layout } from '../components/Layout'
import { ShopView } from '../components/Shop'
import { MetaTags } from '../components/MetaTags'
import { useTranslate } from '../hooks/translate'

interface Props {
  path: string
}

const ShopPage: React.FC<Props> = ({ path }) => {
  const { t } = useTranslate()
  return (
    <Layout>
      <MetaTags
        path={path}
        title={t('Shop')}
        description={t('site-description')}
      />
      <ShopView />
    </Layout>
  )
}

export default ShopPage
