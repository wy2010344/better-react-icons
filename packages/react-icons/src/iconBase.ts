
import { IconContext, RenderItem, RenderRoot } from './iconContext';
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
export function GenIcon(data: IconTree, renderRoot?: RenderRoot) {
  const { renderItem, renderRoot: pRenderRoot } = IconContext.consume();
  (renderRoot || pRenderRoot)(data.attr as any, () => {
    Tree2Element(data.child, renderItem)
  })
}

export type IconType = (props?: RenderRoot) => void
// export function IconBase(
//   props: IconBaseProps & {
//     attr?: Record<string, string>
//   },
//   renderChildren: EmptyFun
// ) {
//   const conf = IconContext.useConsumer()
//   const { attr, size, title, ...svgProps } = props;
//   const computedSize = size || conf.size || "1em";
//   let className;
//   if (conf.className) className = conf.className;
//   if (props.className)
//     className = (className ? className + " " : "") + props.className;

//   return svg.svg({
//     stroke: "currentColor",
//     fill: "currentColor",
//     strokeWidth: "0",
//     ...conf.attr,
//     ...attr,
//     ...svgProps,
//     className,
//     style: {
//       color: props.color || conf.color,
//       ...conf.style,
//       ...props.style,
//     },
//     height: computedSize,
//     width: computedSize,
//     xmlns: "http://www.w3.org/2000/svg"
//   } as any).render(() => {
//     if (title) {
//       svg.title().renderTextContent(title)
//     }
//     renderChildren()
//   })
// }
