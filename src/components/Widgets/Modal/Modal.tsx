import React, {MouseEventHandler, ReactNode, useContext} from "react";
import {Layout, Spacer, HStack, VStack, FlexLayoutProps} from "../../Basic";
import {Toolbar} from "../Toolbar/Toolbar";
import {IconButton} from "../IconButton/IconButton";
import {CoordinatorLayout, AppBarLayout, ScrollLayout} from "../../Layouts";
import {ModalContext} from "../../../dialogs";

export interface ModalWrapperProps {
    action?: ReactNode
    toolbarAction?: ReactNode
    bottomAction?: ReactNode
    bottomActionJustify?: FlexLayoutProps['justify']
    title?: string
    navigationIcon?: ReactNode
    onClickNavigationIcon?: MouseEventHandler<HTMLDivElement>
    children?: ReactNode,
    innerChildren?: ReactNode
}

/**
 * Wrapper component for modals created with the useDialogs() hook.
 * Adaptive in esm as fullscreen
 * @param props
 * @constructor
 */
export function Modal(props: ModalWrapperProps) {
    const modalInfo = useContext(ModalContext)
    if(modalInfo==null) {
        throw new Error("Modal component can be used only in modals")
    }

    const { isFullscreen, dialogInterface } = modalInfo

    const {
        action,
        toolbarAction,
        bottomAction,
        title,
        navigationIcon,
        onClickNavigationIcon,
        children,
        innerChildren,
        bottomActionJustify = 'end'
    } = props

    return <CoordinatorLayout
        maxH={isFullscreen? '100%': '80vh'}
        h={isFullscreen? '100%': 'auto'}
        pos='relative'
        display='flex'
        direction='column'
        insets={isFullscreen ? "safe-area": undefined}
    >
        {innerChildren}
        <AppBarLayout>
            <Toolbar
                navigationIcon={isFullscreen ? navigationIcon: undefined}
                onClickNavigationIcon={onClickNavigationIcon||dialogInterface.close}
                menu={<>
                    {toolbarAction}

                    {
                        isFullscreen? action : <IconButton onClick={onClickNavigationIcon}>
                            {navigationIcon}
                        </IconButton>
                    }
                </>}
            >{title}</Toolbar>
        </AppBarLayout>

        <ScrollLayout flex={1} overflow='hidden' orientation="vertical" behavior={AppBarLayout.ScrollBehavior}>
            <Layout ph={24} pb={24}>
                {children}
            </Layout>
        </ScrollLayout>

        {((!isFullscreen&&action)||bottomAction)&&
            <HStack spacing={16} pv={24} pr={24} pl={16} justify={bottomActionJustify}>
                {bottomAction}
                {action}
            </HStack>
        }
    </CoordinatorLayout>
}