import { useContext } from 'react'
import { Context, Ctx } from '../state/wrapper'

export const useConfig = () => {
  const context = useContext<Context>(Ctx);

  return context.config
}