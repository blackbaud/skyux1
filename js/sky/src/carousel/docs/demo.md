---
name: Carousel
icon: forward
summary: The carousel displays a list of items that the user can cycle through using arrow buttons on the desktop or swipe gestures on a mobile device.
---

The `bb-carousel` component displays a list of items that the user can cycle through using arrow buttons on the desktop or swipe gestures on a mobile device.

### Carousel settings ###
- `bb-carousel` &mdash; Creates a carousel.
    - `bb-carousel-selected-index` &mdash; The index of the item to select. *(Default: 0)*
    - `bb-carousel-selected-index-change` &mdash; Function to call when the user selects a new item in the carousel. This function accepts an `index` parameter representing the selected item index.
    - `bb-carousel-style` &mdash; The style of the carousel.  Options are `card` or `card-small` *(Default: `card`)*  The `card` and `card-small` styles are optimized to display a set of [card components](../card/) in the carousel with the appropriate width and height set for you.
---