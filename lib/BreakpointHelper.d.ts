import { FC } from 'react';
declare type Position = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'left-center' | 'right-center' | 'top-center' | 'top-left' | 'top-right';
interface BreakpointHelperProps {
    position?: Position;
}
export declare const BreakpointHelper: FC<BreakpointHelperProps>;
export {};
