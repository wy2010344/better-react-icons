import type { IconTree } from "src";
import type { IconDefinition } from "./_types";

export function iconRowTemplate(
  icon: IconDefinition,
  formattedName: string,
  iconData: IconTree,
  type = "module",
) {
  switch (type) {
    case "module":
      return (
        `export function ${formattedName} (renderRoot,value) {\n` +
        `  return GenIcon(${JSON.stringify(iconData)},renderRoot,value);\n` +
        `};\n`
      );
    case "common":
      return (
        `module.exports.${formattedName} = function ${formattedName} (renderRoot,value) {\n` +
        `  return GenIcon(${JSON.stringify(iconData)},renderRoot,value);\n` +
        `};\n`
      );
    case "dts":
      return `
export declare function ${formattedName}<T>(renderRoot: (
  attrs: {
    viewBox: string
  },
  children: EmptyFun,
  value: T
) => void,value:T):void;
export declare function ${formattedName}():void;
export declare function ${formattedName}(renderRoot: (
  attrs: {
    viewBox: string
  },
  children: EmptyFun
) => void):void;
`.trim();
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
