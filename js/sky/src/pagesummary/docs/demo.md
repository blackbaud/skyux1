---
name: Page summary
icon: newspaper-o
summary: The page summary displays critical information and actions for users to access quickly and frequently.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The page summary directive displays critical information and actions for users to access quickly and frequently. The parent `bb-page-summary` directive can contain multiple directives, and each one is optional. You select the directives to include in the summary based on the type of page and the scenario you design for.

The directives available within the `bb-page-summary` directive are simple wrappers that you can specify in any order. The page summary component arranges the directives to allow for perfect placement, spacing, etc. It maintains this even when the CSS classes that arrange the directives change behind the scenes.

<p class="alert alert-info">Keep in mind that the page summary is prime real estate on a page. To use it effectively, we recommend that you avoid overloading it. When you limit the number of items, you magnify the impact of each one.</p>

### Title and subtitle
You can display a title and subtitle in the summary to uniquely identify the page content. You can pull data for the title from multiple sources, and you can combine multiple pieces of data in the title. The data to use depends on your users and the context in which they visit the page. You can display additional information in the subtitle. For example, you can display a record's natural language name in the title and its system-generated or coded identifier in the subtitle.

You use the `bb-page-summary-title` and `bb-page-summary-subtitle` directives to display the title and subtitle.

### Image
You can display an image in the summary to help users identify a record or complete a core task. We recommend that you do not include images just for decorative purposes because they are likely to distract users and interfere with task completion.

You use the `bb-page-summary-image` directive to display the image. As the example below demonstrates, you can use this directive in conjunction with [the `bb-avatar` directive](../avatar) to allow users to manage and upload images.

### Status
You can display important status information about a page's content with labels in the status section of the pagesummary.

You use the `bb-page-summary-status` directive to display the status section. You typically display the labels with  a series of `span` elements and the [Bootstrap CSS classes for labels](http://getbootstrap.com/components/#labels). The `bb-label-list` class provides a container for labels to prevent them from overlapping when they wrap to multiple lines.

### Key information
You can highlight important information about a page's content in the key information section of the page summary. This section can display any type of content, but it generally highlights a key information block such as important summary numbers.

You use the `bb-page-summary-keyinfo` directive to display the key information section.

### Arbitrary content
You can display any kind of content in the arbitrary content section of the page summary. We recommend that you display content to support the key tasks of users who visit the page. We also recommend that you keep in mind the context of how users will use the content and limit the content to avoid overloading the summary.

You use the `bb-page-summary-content` directive to display the arbitrary content section.

### Alert
You can display messages that require immediate attention as alerts within the page summary. For example, you can display system-generated messages when certain criteria are met, or you can display notes about a record that you enter manually.

You use the `bb-page-summary-alert` directive to display the alerts. You can use this directive in conjunction with the [the `bb-alert` directive](../alert).

### Action bar
You can display actions within an action bar in the page summary. We recommend that you include only actions that relate to the page as a whole and that you exclude actions that are specific to tiles within the page. We also recommend that you limit the number of actions in the action bar. If your summary requires many actions, we recommend that you re-examine the tasks and consider an alternative workflow.

You can use the `bb-page-summary-action-bar` directive to display the action bar. You can use this directive in conjunction with [the `bb-action-bar` directive](../actionbar).
