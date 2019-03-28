---
name: Infinite Scroll
icon: refresh
summary: The infinite scroll component allows users to load data as the page scrolls.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The infinite scroll component allows users to load data as the page scrolls.

### Infinite scroll settings ###
- `bb-infinite-scroll`
    - `bb-infinite-scroll-has-more` &mdash; Set to true to indicate that there is more data available to be loaded, false otherwise.
    - `bb-infinite-scroll-load` &mdash; Specifies the function to be called when the infinite scroll component is scrolled into view. This function should return a promise if you are loading data asynchronously.
