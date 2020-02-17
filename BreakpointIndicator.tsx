import * as React from 'react';
import { FC, useState, MouseEventHandler } from 'react';
import { hsl, readableColor } from 'polished';
import { Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

/**
 * taken from https://material-ui.com/components/use-media-query/#migrating-from-withwidth
 *
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
const useWidth = () => {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: (Breakpoint | null), key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

const getHue = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
      return (360 / 8) * 0;

    case 'sm':
      return (360 / 8) * 1;

    case 'md':
      return (360 / 8) * 2;

    case 'lg':
      return (360 / 8) * 5;

    case 'xl':
      return (360 / 8) * 6;

    default:
      return 0;
  }
};

export type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-center'
  | 'right-center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  ;

export interface BreakpointIndicatorProps {
  position?: Position;
  visible?: boolean;
}

type PlacementsByPosition = {
  [position in Position]: {
    bottom?: 0;
    left?: 0 | '50%';
    right?: 0;
    top?: 0 | '50%';
  };
};

const positionOrder: Position[] = [
  'top-center',
  'top-right',
  'right-center',
  'bottom-right',
  'bottom-center',
  'bottom-left',
  'left-center',
  'top-left',
]

const placementsByPosition: PlacementsByPosition = {
  'top-center': { left: '50%', top: 0 },
  'top-right': { right: 0, top: 0 },
  'right-center': { right: 0, top: '50%' },
  'bottom-right': { bottom: 0, right: 0 },
  'bottom-center': { bottom: 0, left: '50%' },
  'bottom-left': { bottom: 0, left: 0 },
  'left-center': { left: 0, top: '50%' },
  'top-left': { left: 0, top: 0 },
};

export const BreakpointIndicator: FC<BreakpointIndicatorProps> = ({ visible = true, ...rest }) => (
  visible ? <InternalBreakpointIndicator {...rest} /> : null
);

const InternalBreakpointIndicator: FC<Omit<BreakpointIndicatorProps, 'visible'>> = ({ position: suppliedPosition }) => {
  const defaultPosition = suppliedPosition || positionOrder[0];
  const [position, setPosition] = useState(defaultPosition);
  const breakpoint = useWidth();
  const hue = getHue(breakpoint);
  const backgroundColor = hsl(hue, 0.75, 0.5);
  const color = readableColor(backgroundColor);

  const onClick: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();

    const index = positionOrder.indexOf(position);
    if (index === -1) {
      return;
    }
    const lastIndex = positionOrder.length - 1;
    if (event.ctrlKey) {
      if (index === 0) {
        setPosition(positionOrder[lastIndex])
        return;
      }
      setPosition(positionOrder[index - 1]);
      return;
    }
    if (index >= (lastIndex)) {
      setPosition(positionOrder[0]);
      return;
    }
    setPosition(positionOrder[index + 1]);
  }

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor,
        border: `2px solid ${color}`,
        color,
        padding: '0 1em',
        position: 'fixed',
        cursor: 'pointer',
        zIndex: 99999,
        ...placementsByPosition[position],
      }}
    >
      {breakpoint}
    </div>
  );
};
