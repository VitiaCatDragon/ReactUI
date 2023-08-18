import {Layout, LayoutProps} from "../../Basic/Layout/Layout";
import React, {ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes} from "react";
import {FlexLayout} from "../../Basic/FlexLayout/FlexLayout";
import {Center} from "../../Basic/Center/Center";
import {ThemeTokens} from "../../../theme";
import {CoordinatorLayoutBehavior, CoordinatorLayoutElement} from "../../Layouts/CoordinatorLayout/CoordinatorLayout";
import {
    AppBarLayoutBehavior,
    AppBarLayoutProps,
    AppBarLayoutRefProps,
    AppBarLayoutScrollBehavior
} from "../../Layouts/AppBarLayout/AppBarLayout";

export interface BottomAppBarProps extends LayoutProps {
    fab?: ReactNode,
    hideOnScroll?: boolean
}

/**
 * Bottom AppBar navigation component
 *
 * @param props
 * @constructor
 */
export const BottomAppBar = React.forwardRef((props: BottomAppBarProps, innerRef) => {
    const {
        fab,
        children,
        ...layoutProps
    } = props

    return <Layout
        bg={ThemeTokens.surfaceContainer}
        c={ThemeTokens.onSurface}
        h={80}
        minH={80}
        ref={innerRef}
        {...layoutProps}
    >
        <Center w="100%" h="100%">
            <FlexLayout w="100%" ml={4} mr={16} justifyContent="space-between" alignItems="center">
                <FlexLayout mv={10} c="var(--znui-on-surface-variant)">
                    {children}
                </FlexLayout>

                <Layout layoutSize={56}>
                    {fab}
                </Layout>
            </FlexLayout>
        </Center>
    </Layout>
}) as ForwardRefExoticComponent<PropsWithoutRef<BottomAppBarProps> & RefAttributes<HTMLDivElement>> & {
    defaultBehavior: () => BottomAppBarBehavior
}

export class BottomAppBarBehavior extends CoordinatorLayoutBehavior {

    onScrollStart(dependencies: CoordinatorLayoutElement[], child: CoordinatorLayoutElement): boolean {
        return child.element.props.hideOnScroll || false
    }

    onScroll(
        dependencies: CoordinatorLayoutElement[],
        child: CoordinatorLayoutElement,
        dx: number,
        dy: number
    ) {
        if(dy>0) {
            child.elementInstance!!.style.bottom = (-child.elementInstance!!.getBoundingClientRect().height) + 'px'
        }else{
            child.elementInstance!!.style.bottom = '0px'
        }
    }

    onLayout(parent: HTMLElement, child: CoordinatorLayoutElement) {
        const parentRect = parent.getBoundingClientRect()
        const childRect = child.elementInstance!!.getBoundingClientRect()

        child.elementInstance!!.style.position = 'absolute'
        child.elementInstance!!.style.zIndex = '1'
        child.elementInstance!!.style.width = parentRect.width + 'px'
        child.elementInstance!!.style.transition = 'bottom 300ms var(--emphasized-motion)'
        child.elementInstance!!.style.bottom = child.elementInstance!!.style.left = child.elementInstance!!.style.right = '0px'

        console.log(parent.getBoundingClientRect())
    }
}

BottomAppBar.defaultBehavior = () => new BottomAppBarBehavior()
