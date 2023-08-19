import React from 'react';
import {Layout} from "../../components/Basic/Layout/Layout";
import {FlexLayout} from "../../components/Basic/FlexLayout/FlexLayout";
import {ThemeTokens} from "../../theme";
import {ScrollLayout} from "../../components/Layouts/ScrollLayout/ScrollLayout";

interface PlaygroundRendererProps {
    name?: string;
    preview: React.ReactNode;
    tabBody: React.ReactNode;
}

const PlaygroundRenderer = ({ name, preview, tabBody }: PlaygroundRendererProps) => {
    return (
        <Layout bg={ThemeTokens.surfaceContainerLow} shapeScale="lg">
            <FlexLayout w="100%" direction={[
                'column-reverse',
                null,
                null,
                'row'
            ]}>
                <ScrollLayout maxH={600} minH={600} flex={1}>{tabBody}</ScrollLayout>
                <Layout bg={ThemeTokens.surfaceBright} p={15} data-preview={name} flex={1} overflow="visible">
                    {preview}
                </Layout>
            </FlexLayout>
        </Layout>
    );
};

export default PlaygroundRenderer;