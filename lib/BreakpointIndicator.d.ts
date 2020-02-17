import { FC } from 'react';
export declare type Position = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'left-center' | 'right-center' | 'top-center' | 'top-left' | 'top-right';
export interface BreakpointIndicatorProps {
    position?: Position;
    visible?: boolean;
}
export declare const BreakpointIndicator: FC<BreakpointIndicatorProps>;
