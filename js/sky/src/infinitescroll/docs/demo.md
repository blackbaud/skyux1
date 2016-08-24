---
name: Infinite Scroll
icon: refresh
summary: The infinite scroll component allows users to load data as the page scrolls.
---

The infinite scroll component allows users to load data as the page scrolls.

### Infinite scroll settings ###
- `bb-infinite-scroll`
    - `bb-infinite-scroll-has-more` &mdash; Set to true to indicate that there is more data available to be loaded, false otherwise.
    - `bb-infinite-scroll-load` &mdash; Specifies the function to be called when the infinite scroll component is scrolled into view. This function should return a promise if you are loading data asynchronously.
---