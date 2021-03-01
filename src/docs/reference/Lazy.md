# nostalgie/lazy

The `nostalgie/lazy` package exposes primitives to manage logical boundaries in your app. For example, you might use the [`lazy`](#lazy) function to split your app into smaller chunks to save bandwidth for your users.

## `lazy(importFn, [options])`

Create a lazily-loaded React component, similar to [`React.lazy`](https://reactjs.org/docs/react-api.html#reactlazy).

- `importFn` - a _deferred import function_. In other words, it's a function that, when called, returns a `Promise` that resolves to an object whose `default` property is a React component.
- `options` - optional configuration for the lazy component, where
  - `fallback` - optional fallback React component that, if specified, will be rendered with whatever props the lazy component itself was rendered with

> **IMPORTANT**: The _deferred import function_ MUST have the following syntax for it to be recognized as such at build time: `() => import('./path/to/filename')`. If the deferred import function isn't written that way, your app will still work, but server-side rendering will either not render the imported tree, or do so at an important performance cost.

### Example: Basic lazy component

Create a component, that when rendered, will trigger the closest [`React.Suspense`](https://reactjs.org/docs/react-api.html#reactsuspense) boundary. The loaded component will render when it, and all of its dependencies, have been loaded. If it fails to load, it will trigger the closest [Error Boundary](https://reactjs.org/docs/error-boundaries.html).

```js lines emphasize:3
import { lazy } from 'nostalgie/lazy';

const MyComponentLazy = lazy(() => import('./MyComponent'));
```

### Example: Lazy component with fallback

Create a component, that when rendered, will render the `fallback` component until the load promise and all required dependencies resolve. If it fails to load, it will trigger the closest [Error Boundary](https://reactjs.org/docs/error-boundaries.html).

```js lines emphasize:3-5
import { lazy } from 'nostalgie/lazy';

const MyComponentLazy = lazy(() => import('./MyComponent'), {
  fallback: () => <div>Loading...</div>,
});
```

