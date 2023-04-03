# @sjc5/remix-loading-effect

## Description

Makes adding nprogress to your Remix app really easy. Makes the nprogress loading effect appear whenever there is:

1. a navigation in progress, or
2. a mutation in progress (specifically, a POST request via useFetcher)

Uses some reasonable debouncing to keep it from being too glitchy / janky.

## Installation

```sh
npm i @sjc5/remix-loading-effect
```

## Usage

In your app root, or wherever you want to use the loading effect, do the following:

```ts
import nProgress from "@sjc5/remix-loading-effect/nprogress.css"
import { useLoadingEffect } from "@sjc5/remix-loading-effect/use-loading-effect"

export function links() {
  return [{ rel: "stylesheet", href: nProgress }]
}

export default function App() {
  useLoadingEffect()

  return <html />
}
```

## Customize Color

- To customize color, add an `--nprogress-color` CSS variable to your global stylesheet:

```css
:root {
  --nprogress-color: green;
}
```
