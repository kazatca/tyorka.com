import * as React from 'react'
import { Layout } from '../components/Layout'
import { ShopView } from '../components/Shop'
import { MetaTags } from '../components/MetaTags'
import { useTranslate } from '../hooks/translate'

interface Props {
  location: Location
}

const ShopPage: React.FC<Props> = ({ location }) => {
  const { t } = useTranslate()
  return (
    <Layout>
      <MetaTags
        path={location.pathname}
        title={t('Shop')}
        description={t('site-description')}
      />
      <ShopView />
    </Layout>
  )
}

export default ShopPage
