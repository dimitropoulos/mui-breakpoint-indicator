# Material-UI Breakpoint Indicator

<div style="
  display: flex;
  background: url('media/ziltoid.jpg');
  padding: 1em;
  justify-content: space-between;
">
  <img style="margin: 0 4px;" src="https://user-images.githubusercontent.com/15232461/74609049-31ea5e80-50b4-11ea-99e8-17ece5945039.png" />
  <img style="margin: 0 4px;" src="https://user-images.githubusercontent.com/15232461/74608996-b25c8f80-50b3-11ea-8e2a-2370919c9cf3.png" />
  <img style="margin: 0 4px;" src="https://user-images.githubusercontent.com/15232461/74608993-b092cc00-50b3-11ea-9cad-096c8cc22702.png" />
  <img style="margin: 0 4px;" src="https://user-images.githubusercontent.com/15232461/74609037-18491700-50b4-11ea-9ffb-77caaf8789e6.png" />
  <img style="margin: 0 4px;" src="https://user-images.githubusercontent.com/15232461/74608990-ae307200-50b3-11ea-90d4-b123ada134b1.png" />
</div>


When developing responsive applications with material-ui, it's often helpful to be able to easily visualize the current breakpoint.  Enter, `<BreakpointIndicator />`.

## How does it work?

You can simply import the component at the top level of your app, _just_ after `material-ui`'s `ThemeProvider` (shown below with `redux` as well):

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './path/to/my/theme';
import { MyApp } from './path/to/MyApp';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { BreakpointIndicator } from 'mui-breakpoint-indicator';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSBaseline />
      <BreakpointIndicator />
      <MyApp />
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root'),
);
```

## How can it be configured?

### the `position` prop [string, defaults to `top-center`]

The `BreakpointIndicator` has an optional `position` prop with the following type:

```ts
type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-center'
  | 'right-center'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  ;
```

The default is `top-center`, but you can configure the default to whatever position you prefer, e.g.:
```tsx
<BreakpointIndicator position="bottom-right" />
```

### the `visible` prop [boolean, defaults to `true`]

A common use case is to use a tool like this conditionally, e.g.:

```tsx
const debugMode = useSelector(selectDebugMode);

return (
  <div>
    {debugMode && <BreakpointIndicator />}
    <MyApp />
  <div>
)
```

While you can still do the above, `BreakpointIndicator` accepts a `visible` prop (defaults to `true`) where you can pass a debugMode flag, as above:

```tsx
const debugMode = useSelector(selectDebugMode);

return (
  <div>
    <BreakpointIndicator debugMode={debugMode} />
    <MyApp />
  <div>
)
```

The implementation of the `visible` prop is such that passing `visible={false}` is a no-op.

## How can it be interacted with?

### Resize the Viewport

Simply resize the viewport, and watch the indicator change:

![resize](https://user-images.githubusercontent.com/15232461/74608880-d23f8380-50b2-11ea-8412-0fc94c684b71.gif)

### Click to Rotate

#### Clockwise
You can click on the indicator to temporarily rotate it to the next position, clockwise.
![clockwise](https://user-images.githubusercontent.com/15232461/74608909-20548700-50b3-11ea-9802-e63951743ab3.gif)

#### Counter-Clockwise
You can ctrl+click the indicator to rotate it counter-clockwise.
![counterclockwise](https://user-images.githubusercontent.com/15232461/74608910-22b6e100-50b3-11ea-8d0a-7e693cfd1c5a.gif)

> **NOTE:** When you refresh or rerender your app it will revert to whatever the `position` prop is set to (or the default, `top-center` if none is set), so be sure to just set the `position` prop if you want it to always be in a particular area of the screen.

## Can I use this if I'm not using Material-UI?

No.  At this time, this component is directly tied to some material-ui underpinnings.
