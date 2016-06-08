---
name: Palette
icon: paint-brush
summary: The palette service provides methods to consistently produce a sequence of colors for SKY UX applications.
---

The palette service provides functions to apply a consistent color palette to SKY UX applications.

  - `getColorByIndex(index, paletteType)` &mdash; Gets a specific color from the pallette based on its index.
    - `index` &mdash; *(Required.)* An integer for the index of the color.
    - `paletteType` &mdash; *(Optional.)* A string that represents `mono` or `multi`. *(Default: `multi`)*
  - `getColorSequence(requestedLength, paletteType)` &mdash; Returns an array of colors for the requested length. When using with `ng-repeat`, be sure to use the `track by` syntax since we return duplicates.
    - `requestedLength` &mdash; A required integer for the size of the array of colors you want returned.
    - `paletteType` &mdash; *(Optional.)* A string that represents `mono` or `multi`. *(Default: `multi`)*