
import { IconContext, RenderItem } from './iconContext';
export interface IconTree {
  tag: string;
  attr: Record<string, string>;
  child: IconTree[];
}
function Tree2Element(items: IconTree[], renderItem: RenderItem) {
  items.forEach(function (item) {
    renderItem(item.tag, item.attr, () => {
      Tree2Element(item.child, renderItem)
    })
  })
}
export interface SvgAttrInfo {
  viewBox: string
}
export interface IconInfo {
  iconName: string
}
export function GenIcon(fun: any, data: IconTree, renderRoot: any, value: any) {
  const { renderItem, renderRoot: pRenderRoot } = IconContext.consume();
  (renderRoot || pRenderRoot)(fun, data.attr as any, () => {
    Tree2Element(data.child, renderItem)
  }, value)
}
