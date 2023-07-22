import {
    background,
    border,
    colors, effect,
    flex,
    grid, interactivity,
    layout, list,
    margin, scroll,
    padding,
    position,
    transform,
    typography, textDecoration, transition
} from "./configs";
import React from "react";
import {StyleProps, ZnUIComponent} from "./styled.types";
import createStyled, {FunctionInterpolation} from "@emotion/styled"
import {css} from "./css";
import {LayoutBreakpoint} from "../adaptive/LayoutBreakpoint";
import {runIfFn} from "../utils";

const emotion = ((createStyled as any).default ?? createStyled) as typeof createStyled

type StyleResolverProps = StyleProps & {
    currentBreakPoint: LayoutBreakpoint
}

interface GetStyleObject {
    (options: {
        baseStyle?: StyleProps,
    }): FunctionInterpolation<StyleResolverProps>
}

export const styledProps = {
    ...background,
    ...border,
    ...colors,
    ...effect,
    ...flex,
    ...grid,
    ...layout,
    ...margin,
    ...padding,
    ...position,
    ...transform,
    ...typography,
    ...interactivity,
    ...list,
    ...scroll,
    ...textDecoration,
    ...transition,
    ...transform,
}

export const isStyleProp = (prop: string) => prop in styledProps

export const toCSSObject: GetStyleObject =
    ({ baseStyle }) =>
        (props) => {
            const {currentBreakPoint, ...rest} = props
            const styleProps = {}
            Object.keys(rest)
                .filter((prop) => isStyleProp(prop))
                .forEach(prop => {
                    styleProps[prop] = rest[prop]
                })

            const baseStyles = runIfFn(baseStyle, rest) || {}

            return css({
                ...baseStyles,
                ...styleProps
            })
        }

export function styled<T extends React.ElementType, P extends object = {}>(component: T, baseProps: P|null = null) {
    const styleObject = toCSSObject({
        baseStyle: {
            overflow: 'clip',
            ...baseProps
        }
    })

    const Component = emotion(
        component as React.ComponentType<any>,
    )(styleObject)

    const znComponent = React.forwardRef(function ZnUIComponent(
        props,
        ref,
    ) {
        return React.createElement(Component, {
            ref,
            ...props,
        })
    })

    return znComponent as ZnUIComponent<T, P>
}