---
name: Wizard
icon: magic
summary: The wizard adjusts a modal form to guide users through a set of pre-defined steps in a particular order.
---

Wizards are used on a modal form when the user needs to perform a set of pre-defined steps in a particular order. The Sky UX wizard works in conjunction with the [Angular UI Bootstrap tabs component](http://angular-ui.github.io/bootstrap/#/tabs).  Placing the `bb-wizard` directive on a UI Bootstrap `uib-tabset` element will cause the tabs to look and behave like a Sky wizard.

Sky wizards also have the concept of a completed step which is denoted by the `bb-wizard-step-complete` directive. When present on a `uib-tab` and bound to a truthy value, the step's tab will be displayed as completed.

Finally there is a `bbWizardNavigator` service that provides some convenience methods for navigating through the wizard's steps. This will typically be used by wiring the navigator up to your modal's previous and next buttons.

The `bbWizardNavigator` service has an `init()` function that takes an `options` object with the following properties:
- `active` &mdash; The index of the active tab, this should be the same property that is bound the the UI Bootstrap `uib-tabset` directive's `active` property.
- `steps` &mdash; An array of steps. Each step should have the following properties:
   - `active` &mdash; *(Deprecated.)* Use the UI Bootstrap `uib-tabset` directive's `active` property instead <s> Indicates whether the step is the currently active step. This should be the same property that is bound to the UI Bootstrap `uib-tab` directive's `active` property.</s>
   - `disabled()` &mdash; A function that returns a boolean indicating whether the tab is disabled. This should be the same function that is bound to the UI Bootstrap `uib-tab` directive's `disable` property.
   - `complete()` &mdash; A function that returns a boolean indicating whether the tab is complete. This should be the same function that is bound to the tab's `bb-wizard-step-complete` property.
- `finish()` &mdash; A function that will execute when the user clicks finish on the last step of the wizard.

The `bbWizardNavigator` also exposes the following methods:

- `previousText()` &mdash; Returns the text for the modal's Previous button. This usually doesn't change while the user interacts with the widget.
- `nextText()` &mdash; Returns the text for the modal's Next button. This changes to "Finish" when the user is on the last step.
- `goToPrevious()` &mdash; Navigates the user to the previous step.
- `goToNext()` Navigates the user to the next step.
- `previousDisabled()` &mdash; Indicates whether the previous step is disabled. This should be bound to the `ng-disabled` property of the modal's Previous button.
- `nextDisabled()` &mdash; Indicates whether the next step is disabled. This should be bound to the `ng-disabled` property of the modal's Next button.
