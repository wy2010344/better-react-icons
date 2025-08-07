import type { IconTree } from "src";
import type { IconDefinition } from "./_types";

export function iconRowTemplate(
  icon: IconDefinition,
  formattedName: string,
  iconData: IconTree,
  rawName: string,
  type = "module",
) {
  switch (type) {
    case "module":
      return (
        `
export function ${formattedName} (renderRoot,value) {
  return GenIcon(${formattedName},${JSON.stringify(iconData)},renderRoot,value);
};
${formattedName}.iconName='${rawName}';
`.trimStart()
      );
    case "common":
      return (
        `
module.exports.${formattedName} = function ${formattedName} (renderRoot,value) {
  return GenIcon(${formattedName},${JSON.stringify(iconData)},renderRoot,value);
};
${formattedName}.iconName='${rawName}';
`.trimStart()
      );
    case "dts":
      return `
export declare function ${formattedName}<T>(renderRoot: (
  fun:IconInfo,
  attrs: SvgAttrInfo,
  children: EmptyFun,
  value: T
) => void,value:T):void;
export declare function ${formattedName}():void;
export declare function ${formattedName}(renderRoot: (
 fun:IconInfo,
  attrs: SvgAttrInfo,
  children: EmptyFun
) => void):void;
export declare namespace ${formattedName}{
  const iconName:string
}
`.trimStart();
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
