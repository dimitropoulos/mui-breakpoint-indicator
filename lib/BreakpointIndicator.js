"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakpointIndicator = void 0;
const React = require("react");
const react_1 = require("react");
const polished_1 = require("polished");
const core_1 = require("@material-ui/core");
const ramda_1 = require("ramda");
/**
 * taken from https://material-ui.com/components/use-media-query/#migrating-from-withwidth
 *
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
const useWidth = () => {
    var _a;
    const theme = core_1.useTheme();
    return ((_a = ramda_1.reduce((accumulator, breakpoint) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks -- see above
        const matches = core_1.useMediaQuery(theme.breakpoints.up(breakpoint));
        return accumulator === null && matches ? breakpoint : accumulator;
    }, null, ramda_1.reverse(theme.breakpoints.keys))) !== null && _a !== void 0 ? _a : 'xs');
};
const getHue = (breakpoint) => {
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
const positionOrder = [
    'top-center',
    'top-right',
    'right-center',
    'bottom-right',
    'bottom-center',
    'bottom-left',
    'left-center',
    'top-left',
];
const placementsByPosition = {
    'top-center': { left: '50%', top: 0 },
    'top-right': { right: 0, top: 0 },
    'right-center': { right: 0, top: '50%' },
    'bottom-right': { bottom: 0, right: 0 },
    'bottom-center': { bottom: 0, left: '50%' },
    'bottom-left': { bottom: 0, left: 0 },
    'left-center': { left: 0, top: '50%' },
    'top-left': { left: 0, top: 0 },
};
const InternalBreakpointIndicator = ({ className = '', position: suppliedPosition, style = {}, }) => {
    const defaultPosition = suppliedPosition !== null && suppliedPosition !== void 0 ? suppliedPosition : positionOrder[0];
    const [position, setPosition] = react_1.useState(defaultPosition);
    const breakpoint = useWidth();
    const hue = getHue(breakpoint);
    const backgroundColor = polished_1.hsl(hue, 0.75, 0.5);
    const color = polished_1.readableColor(backgroundColor);
    const onClick = event => {
        event.stopPropagation();
        const index = positionOrder.indexOf(position);
        if (index === -1) {
            return;
        }
        const lastIndex = positionOrder.length - 1;
        if (event.ctrlKey) {
            if (index === 0) {
                setPosition(positionOrder[lastIndex]);
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
    };
    return (React.createElement("div", { className: className, onClick: onClick, style: Object.assign(Object.assign({ backgroundColor, border: `2px solid ${color}`, color, cursor: 'pointer', padding: '0 1em', position: 'fixed', zIndex: 99999 }, placementsByPosition[position]), style) }, breakpoint));
};
exports.BreakpointIndicator = (_a) => {
    var { visible = true } = _a, rest = __rest(_a, ["visible"]);
    return (visible ? React.createElement(InternalBreakpointIndicator, Object.assign({}, rest)) : null);
};
//# sourceMappingURL=BreakpointIndicator.js.map