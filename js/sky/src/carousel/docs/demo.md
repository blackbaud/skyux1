---
name: Carousel
icon: forward
summary: The carousel displays a series of items such as cards that users can cycle through.
---

The `bb-carousel` component displays a series of items such as cards that users can cycle through. Users can click arrow buttons on desktops or swipe through items on mobile devices.

### Carousel settings ###
- `bb-carousel` &mdash; Creates a carousel to display a series of items such as cards.
    - `bb-carousel-selected-index` &mdash; Specifies the index of the item to select. *(Default: 0)*
    - `bb-carousel-selected-index-change` &mdash; Specifies the function to call when users selects items in the carousel. This function accepts an `index` parameter that represents the selected item index.
    - `bb-carousel-style` &mdash; Specifies the style for the carousel. The `card` and `card-small` styles are optimized to display [card components](../card/) and set the appropriate height and width. *(Default: `card`)*
---