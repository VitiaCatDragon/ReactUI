import React, {useEffect} from "react";
import {createContext, useState} from "react";
import {LayoutBreakpoint, LayoutBreakpointsValues} from "../../../adaptive/LayoutBreakpoint";
import {AdaptiveData} from "../../../adaptive/AdaptiveData";

export function getCurrentDimensionBreakpoint(): LayoutBreakpoint {
    return Object.keys(LayoutBreakpointsValues).find((key) => window.innerWidth <= LayoutBreakpointsValues[key]) as LayoutBreakpoint
}

export function buildCurrentAdaptiveData(): AdaptiveData {
    const currentBreakpoint = getCurrentDimensionBreakpoint()
    return {
        currentBreakpoint,
        breakpointWidth: LayoutBreakpointsValues[currentBreakpoint]
    }
}

export const AdaptiveContext = createContext<AdaptiveData|null>(null)

export const AdaptiveProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [data, setData] = useState<AdaptiveData>(buildCurrentAdaptiveData())

    useEffect(() => {
        const resizeListener = () => {
            const updatedData = buildCurrentAdaptiveData()
            if(data.currentBreakpoint!==updatedData.currentBreakpoint) {
                setData(updatedData)
            }
        }

        window.addEventListener('resize', resizeListener);

        return(() => {
            window.removeEventListener('resize', resizeListener);
        })
    }, [setData])

    return <AdaptiveContext.Provider value={data}>
        {children}
    </AdaptiveContext.Provider>
}