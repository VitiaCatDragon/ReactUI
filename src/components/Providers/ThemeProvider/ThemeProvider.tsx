import React, {useEffect} from 'react'
import './ThemeProvider.css';

export interface ThemeProviderProps {
    children: React.ReactNode,
    theme?: 'light'|'dark'
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const theme = props.theme || 'light'

    return <div className="ThemeProvider" data-theme={theme}>
        {props.children}
    </div>
}