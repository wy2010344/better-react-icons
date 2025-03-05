import { createContext } from 'mve-core'
import { EmptyFun } from 'wy-helper';
export type RenderItem = (
  tag: string,
  attrs: Record<string, string>,
  children: EmptyFun
) => void
export interface IconContext {
  renderItem: RenderItem,
  renderRoot: RenderRoot
}
export type RenderRoot = (
  attrs: {
    viewBox: string
  },
  children: EmptyFun
) => void
export const DefaultContext: IconContext = {
  renderItem: null as any,
  renderRoot: null as any
};

export const IconContext =
  createContext && createContext(DefaultContext);
