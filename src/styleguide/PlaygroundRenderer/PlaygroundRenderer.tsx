import React from 'react';
import {Layout} from "../../components/Basic/Layout/Layout";
import {FlexLayout} from "../../components/Basic/FlexLayout/FlexLayout";
import {ThemeTokens} from "../../theme";

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
                'row'
            ]}>
                <Layout maxH={600} minH={600} flex={1}>{tabBody}</Layout>
                <Layout bg={ThemeTokens.surfaceBright} p={15} data-preview={name} flex={1} overflow="visible">
                    {preview}
                </Layout>
            </FlexLayout>
        </Layout>
    );
};

export default PlaygroundRenderer;