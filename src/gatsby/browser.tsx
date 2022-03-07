import React from 'react'
import { WrapPageElementBrowserArgs } from 'gatsby'
import { Root } from './wrapper'

export const wrapRootElement: React.FC<WrapPageElementBrowserArgs> = ({
  element,
}) => <Root>{element}</Root>
