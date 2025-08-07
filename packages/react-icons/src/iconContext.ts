import { createContext } from 'mve-core'
import { EmptyFun } from 'wy-helper';
import { IconInfo, SvgAttrInfo } from './iconBase';
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
  fun: IconInfo,
  attrs: SvgAttrInfo,
  children: EmptyFun
) => void
export const DefaultContext: IconContext = {} as any;

export const IconContext = createContext<IconContext>(DefaultContext);
