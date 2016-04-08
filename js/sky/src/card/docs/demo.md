---
name: Card
icon: square-o
summary: The card component creates a small container to highlight important information.
---

The card directive creates a small container to highlight important information. Generally, multiple cards are organized together to display information about a collection of related items. For example, cards can present a stack or carousel of to-do items or a matrix of images. Cards frequently present users with a call to action. They can use visual cues to alert users about the need for action, and they can include actions directly on the cards.

You can modify cards to handle a variety of scenarios, but they generally consist of three main parts: a title to identify what the card represents, content to display in the body of the card, and an action to let users act on the card. Each item is optional, and cards can also display additional content to the left or right of the title. However, we recommend that you generally avoid content beside the title because the body of the card is better-suited for most content. Content beside the title is primarily useful for niche cases. For example, if you have a matrix of cards where the order is very important, you can display an ordering number to the left of the header to make it clear whether the order is top-to-bottom or left-to-right.

<!--
Cards can modify cards to handle a variety of scenarios, but they generally consist of three main parts: a title, content, and action. The title identifies what the card represents; the content specifies what to display in the body of the card; and the action allows users to act on the intent of the card. Each item is optional, and cards can also display additional content to the left or right of the title. However, we recommend that you generally avoid content beside the title, which is primarily useful for niche cases. For example, if you have a matrix of cards where the order is very important, you can display an ordering number to the left of the header to make it clear whether the order is top-to-bottom or left-to-right.
-->

### Card Settings ###
- `bb-card` &mdash; Creates a small container to highlight important information.
    - `bb-card-size` &mdash; Specifies the size of the card. For a large container, specify `'large'`. For a small container, specify `'small'`.
    - `bb-card-selectable` &mdash; Specifies whether to make the entire card clickable. You can use this property in combination with `bb-card-heading-right` to include a checkbox to the right of the title and let users click anywhere in the card to select or de-select it.
    - `bb-card-title` &mdash; Specifies a title to identify the content that the card displays. The title is not required, but we recommend that you include it except in special circumstances. For example, you may not want a title on a card that displays an image with a filename that won't mean anything to the user when the image itself is the most important content.
    - `bb-card-content` &mdash; Specifies the content to display in the body of the card. The type of content varies based on what the card represents and whether it prompts users to action. Content can consist of some combination of a graph, trend, status, summary information, and guidance text.
    - `bb-card-actions` &mdash; Specifies an action to display for users to act on the intent of the card. To display a set of actions, use [the `bb-context-menu` directive](../contextmenu) within this property.
    - `bb-card-heading-left` &mdash; Specifies content to display to the left of the header. In general, we recommend that you do not use this property. However, it can be useful to highlight information in some scenarios. For example, if you have a matrix of cards where the order is very important, you can display an ordering number to the left of the header to make it clear whether the order is top-to-bottom or left-to-right.
    - `bb-card-heading-right` &mdash; Specifies content to display to the right of the header. In general, we recommend that you do not use this property. However, it can be useful to highlight information in some scenarios. For example, you can display a checkbox to indicate when a card's call to action is complete, or you can display an ancillary action, such as a drag-and-drop control. 

---
