---
name: Resources
icon: language
summary: The resources constant and filter are available for localizing SKY UX components.
---

`bbResources` is mostly applicable for component development.  When building SKY UX, anytime a string needs to be rendered, the `bbResources` constant should be injected.  Doing so means all available locale strings are available on the `bbResources` object as well as in a `bbResources` filter.
