---
name: Help button
icon: question-circle
summary: The help button component creates a help icon to open help content that you specify. It can also override the default help content in the help panel.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


<div class="alert alert-warning">
  <div class="media">
    <div class="media-left">
      <span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-flag fa-stack-1x fa-inverse"></i></span>
    </div>
    <div class="media-body">
      <h4 class="media-heading" id="advanced-users-only">For Blackbaud Internal Use Only</h4>
      The help button directive is not currently available for third-party custom applications.
    </div>
  </div>
</div>

The help button directive creates a help icon that users can click to launch a help key that you specify. The presence of the help icon on a page can also optionally override the default help content that the help panel displays based on page context.

### Help button settings ###
- `bb-help-button` &mdash; Creates a help icon to open help content that you specify.
 - `bb-help-key` &mdash; Specifies a help key to open when users click the help icon.
 - `bb-set-help-key-override` &mdash; *(Optional.)* Indicates whether to override the page context when [the help service](../help) displays help content in the help panel. To display help content based on `bb-help-key` instead of page context, set this property to `true`. *(Default: `false`)*
