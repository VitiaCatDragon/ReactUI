import * as CSS from "csstype";
import {Adaptive} from "../../adaptive/Adaptive";
import {propConfig} from "../utils/props";

export const colors = {
    color: propConfig("color"),
    fill: propConfig("fill"),
    stroke: propConfig("stroke"),
    opacity: propConfig("opacity"),
}

Object.assign(colors, {
    textColor: colors.color,
    c: colors.color,
    oc: colors.opacity
})

export interface ColorsProps {
    /**
     * Text color
     * @default currentColor
     */
    textColor?: Adaptive<CSS.Property.Color>
    color?: Adaptive<CSS.Property.Color|string>
    c?: Adaptive<CSS.Property.Color|string>

    /**
     * The CSS `fill` property for icon svgs and paths
     */
    fill?: Adaptive<CSS.Property.Color>

    /**
     * The CSS `stroke` property for icon svgs and paths
     */
    stroke?: Adaptive<CSS.Property.Color>
}