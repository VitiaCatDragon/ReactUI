import {ZnUISchemeData, ZnUITheme} from "./theme.types";
import {durationProp, elevationProp, motionProp, paletteProp, propAsCSSVar, shapeProp, styleProp} from "./names";
import {ZnUIMotion} from "./motion";
import {ZnUIElevation} from "./elevation";
import {ZnUIShapes} from "./shapes";

const NestedThemeTokens = {
    shapes: new Proxy({}, {
        get(_, prop) {
            return propAsCSSVar(shapeProp(prop.toString()));
        },
    }) as ZnUIShapes,
    elevation: new Proxy({}, {
        get(_, prop) {
            return propAsCSSVar(elevationProp(prop.toString()));
        },
    }) as ZnUIElevation,
    motion: new Proxy({}, {
        get(_, prop) {
            if(prop === 'duration') {
                return new Proxy({}, {
                    get(_, type) {
                        return propAsCSSVar(durationProp(type.toString()));
                    },
                }) as ZnUIMotion['duration']
            }

            return propAsCSSVar(motionProp(prop.toString()));
        },
    }) as ZnUIMotion,
    palettes: new Proxy({}, {
        get(_, palette) {
            return new Proxy({}, {
                get(_, num) {
                    return propAsCSSVar(paletteProp(palette.toString(), num.toString()));
                },
            }) as ZnUITheme['palettes']
        },
    }) as ZnUITheme['palettes']
}

export const ThemeTokens = new Proxy(NestedThemeTokens, {
    get(target, prop) {
        if(prop in target) {
            return target[prop]
        }

        return propAsCSSVar(styleProp(prop.toString()));
    },
}) as ZnUISchemeData & typeof NestedThemeTokens