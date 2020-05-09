import * as React from 'react'
import Single from '../components/Single'
import { LanguageSelector } from '../components/LanguageSelector'

interface Props {
  pathContext: {
    id: number
    slug: string
    name: string
    price?: number
  }
}

const SinglePage = ({pathContext: {price, name}}: Props) => {
  return (
    <>
      <Single
        name={name}
        price={price}
      />
      <LanguageSelector />
    </>);
}

export default SinglePage;