import {Adaptive} from "../../adaptive/Adaptive";
import * as CSS from "csstype";
import {propConfig} from "../utils/props";

export const position = {
    position: propConfig("position"),
    top: propConfig("top"),
    bottom: propConfig("bottom"),
    left: propConfig("left"),
    right: propConfig("right"),
    positionVertical: propConfig(["left", "right"]),
    positionHorizontal: propConfig(["top", "bottom"]),
}

Object.assign(position, {
    pos: position.position,
    posV: position.positionVertical,
    posH: position.positionHorizontal,
})

export interface PositionProps {
    /**
     * Position
     * @default 0
     */
    position?: Adaptive<CSS.Property.Position>
    pos?: Adaptive<CSS.Property.Position>

    /**
     * Position top
     * @default pv
     */
    top?: Adaptive<CSS.Property.Top|number>

    /**
     * Position bottom
     * @default pv
     */
    bottom?: Adaptive<CSS.Property.Bottom|number>

    /**
     * Position left
     * @default ph
     */
    left?: Adaptive<CSS.Property.Left|number>

    /**
     * Position right
     * @default ph
     */
    right?: Adaptive<CSS.Property.Right|number>


    /**
     * Position horizontal (posH = position left = position right)
     * @default undefined
     */
    posH?: Adaptive<CSS.Property.Left|CSS.Property.Right|number>
    positionHorizontal?: Adaptive<CSS.Property.Left|CSS.Property.Right|number>

    /**
     * Position vertical (posV = position top = position bottom)
     * @default undefined
     */
    posV?: Adaptive<CSS.Property.Top|CSS.Property.Bottom|number>
    positionVertical?: Adaptive<CSS.Property.Top|CSS.Property.Bottom|number>
}