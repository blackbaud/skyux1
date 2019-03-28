---
name: Key info
icon: key
summary: The key info component highlights important information such as summary numbers.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The key info directive highlights important information. It can display any type of content but generally highlights details such as important summary numbers. The directive displays its main value in large, bold text, and it displays a corresponding label in smaller, plain text. By default, the directive uses a vertical layout with the label under the primary value, but you can also use a horizontal layout with the label to the side of the primary value. 

### Key info settings ###
    - `bb-key-info` &mdash; Highlights important information such as summary numbers.
        - `bb-key-info-layout` &mdash; *(Optional.)* Indicates whether to display key info in a vertical layout with the label under the primary value or in a horizontal layout with the label beside the primary value. To display key info horizontally, set this property to `horizontal`. *(Default: `vertical`)*
        - `bb-key-info-value` &mdash; Specifies the primary content to display in large, bold text. 
        - `bb-key-info-label` &mdash; Specifies a label to display in smaller, plain text under or beside the primary value.
