---
name: Carousel
icon: forward
summary: The carousel displays a series of items such as cards that users can cycle through.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The carousel component displays a series of items such as cards for users to cycle through. Users can click arrow buttons to cycle through items on their desktops, and they can swipe through items on mobile devices. The carousel displays a progress bar under the selected item, and users can click the dots in the progress bar to select different items. 

### Carousel settings ###
- `bb-carousel` &mdash; Creates a carousel to display a series of items such as cards.
    - `bb-carousel-selected-index` &mdash; Specifies the index of the item to select. *(Default: `0`)*
    - `bb-carousel-selected-index-change` &mdash; Specifies the function to be called when users select items in the carousel. This function accepts an `index` parameter that represents the selected item.
    - `bb-carousel-style` &mdash; Specifies the style for the carousel. The `card-large` and `card-small` styles are optimized to display [card components](../card/) and set the appropriate height and width. *(Default: `card-large`)*
