
import { IconContext, DefaultContext } from "./iconContext";
import { svg, TextOrFunNode } from 'better-react-dom'
import { EmptyFun, emptyObject } from 'wy-helper'
import { SvgAttributeSO } from 'wy-dom-helper'
export interface IconTree {
  tag: string;
  attr: { [key: string]: string };
  child: IconTree[];
}

function Tree2Element(tree: IconTree[]) {
  return (
    tree &&
    tree.map((node, i) => svg[node.tag as 'svg'](node.attr as any).render(() => {
      Tree2Element(node.child)
    })
    )
  );
}
export function GenIcon(data: IconTree) {
  return (props: IconBaseProps = emptyObject) => (
    IconBase({
      attr: data.attr,
      ...props
    }, () => {
      Tree2Element(data.child)
    })
  );
}

export interface IconBaseProps extends SvgAttributeSO<'svg'> {
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (props?: IconBaseProps) => void
export function IconBase(
  props: IconBaseProps & {
    attr?: Record<string, string>
  },
  renderChildren: EmptyFun
) {
  const conf = IconContext.useConsumer()
  const { attr, size, title, ...svgProps } = props;
  const computedSize = size || conf.size || "1em";
  let className;
  if (conf.className) className = conf.className;
  if (props.className)
    className = (className ? className + " " : "") + props.className;

  return svg.svg({
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    ...conf.attr,
    ...attr,
    ...svgProps,
    className,
    style: {
      color: props.color || conf.color,
      ...conf.style,
      ...props.style,
    },
    height: computedSize,
    width: computedSize,
    xmlns: "http://www.w3.org/2000/svg"
  } as any).render(() => {
    if (title) {
      svg.title().renderTextContent(title)
    }
    renderChildren()
  })
}
