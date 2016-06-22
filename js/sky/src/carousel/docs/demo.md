---
name: Carousel
icon: forward
summary: The carousel displays a series of items such as cards that users can cycle through.
---

The carousel component displays a series of items such as cards for users to cycle through. Users can click arrow buttons to cycle through items on their desktops, and they can swipe through items on mobile devices. The carousel displays a progress bar under the selected item, and users can click the dots in the progress bar to select different items. 

### Carousel settings ###
- `bb-carousel` &mdash; Creates a carousel to display a series of items such as cards.
    - `bb-carousel-selected-index` &mdash; Specifies the index of the item to select when the carousel loads. *(Default: 0)*
    - `bb-carousel-selected-index-change` &mdash; Specifies the function to be called when users select items in the carousel. This function accepts an `index` parameter that represents the selected item.
    - `bb-carousel-style` &mdash; Specifies the style for the carousel. The `card-large` and `card-small` styles are optimized to display [card components](../card/) and set the appropriate height and width. *(Default: `card-large`)*
---