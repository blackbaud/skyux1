---
name: Infinity Scroll
icon: refresh
summary: The infinity scroll component allows users to load data as the page scrolls.
---

The infinity scroll component allows users to load data as the page scrolls.

### Infinity scroll settings ###
- `bb-infinity-scroll`
    - `bb-infinity-scroll-has-more` &mdash; Set to true to indicate that there is more data available to be loaded, false otherwise.
    - `bb-infinity-scroll-load` &mdash; Specifies the function to be called when the infinity scroll component is scrolled into view.
      - `loadComplete` &mdash; A function provided by the infinity scroll component as an argument to the `bb-infinity-scroll-load` callback that should be called when the user has finished loading data.
    - `bb-infinity-scroll-load-text` &mdash; *(Optional.)* Text for the infinity scroll button when the component is not loading data. *(Default = `Load more`)*
---