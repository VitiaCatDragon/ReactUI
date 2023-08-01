import './Display.css';
import React from "react";
import classNames from "classnames";
import {Layout, LayoutProps} from "../../Basic/Layout/Layout";
import {useAdaptiveProps, useAdaptiveValue} from "../../../adaptive/useAdaptive";
import {Adaptive} from "../../../adaptive/Adaptive";

export interface DisplayProps extends LayoutProps {
    size?: Adaptive<'small'|'medium'|'large'>;
}

/**
 * Display Typography component
 * @param props
 * @constructor
 */
export const Display = (props: DisplayProps) => {
    const {
        size,
        as = 'h4' as React.ElementType,
        className,
        ...otherProps
    } = props


    return <Layout ms={0} me={0} as={as} className={classNames(
        className,
        'znui-display-'+(useAdaptiveValue(size) || 'medium')
    )} {...otherProps}/>
}