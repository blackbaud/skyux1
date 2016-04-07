---
name: Card
icon: square-o
summary: The card directive provides a container to highlight a small amount of important information.
---

The card directive provides a container to highlight a small amount of important information about an object. Cards can display a collection of related items in a presentation format such as a stack or carousel of to-do items or a matrix of images. Cards are frequently present users with a call to action or use visual presentation to draw their attention to objects that require action.

Cards generally consist of a title, main content, and action, although each item is optional. Cards can also display additional content to the left or right of the title, although recommend that you only display content beside the title in rare cases.

### Card Settings ###
- `bb-card` &mdash; Creates a container to highlight important information.
    - `bb-card-size` &mdash; 
    - `bb-card-selectable` &mdash; 
    - `bb-card-heading-left` &mdash; Specifies content to display to the left of the header. In general, we recommend against displaying content to the left of the header. However, in some scenarios, it can be useful. For example, the primary use case is to display an order number when the card is part of a matrix of cards to make the order of the cards clear.
    - `bb-card-title` &mdash; Specifies at title to identify the content that the card displays. The title is not required, but we recommend tha tyou include a title except in special circumstances. For example, you may not want to include a title on a card that displays an image with a filename that won't mean anything to the user and where the image itself is the most imporant content.
    - `bb-card-content` &mdash; Specifies the content to display in the body of the tile. The type of content to display varies based on what the card represents and whether the card prompts users to action. For example, the content can include some combination of a graph, trend, status, summarized key information, and guidance text.
    - `bb-card-heading-right` &mdash; 
    - `bb-card-actions` &mdash; 

---
