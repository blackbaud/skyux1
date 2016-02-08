---
name: Wizard
icon: magic
summary: The wizard adjusts a modal form to guide users through a set of pre-defined steps in a particular order.
---

Wizards are used on a modal form when the user needs to perform a set of pre-defined steps in a particular order. The Sky UX Wizard works in conjunction with the [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/) tabs component.  Placing the `bb-wizard` directive on a UI Bootstrap `tabset` element will cause the tabs to look and behave like a Sky wizard.

Sky Wizards also have the concept of a completed step which is denoted by the `bb-wizard-step-complete` directive. When present on a `tab` and bound to a truthy value, the step's tab will be displayed as completed.

Finally there is a `bbWizardNavigator` service that provides some convenience methods for navigating through the wizard's steps. This will typically be used by wiring the navigator up to your modal's previous and next buttons.

The `bbWizardNavigator` service has an `init()` function that takes an `options` object with the following properties:

- `steps` An array of steps. Each step should have the following properties:


 - `active` Indicates whether the step is the currently active step. This should be the same property that is bound to the UI Bootstrap `tab` directive's `active` property.
 - `disabled()` A function that returns a boolean indicating whether the tab is disabled. This should be the same function that is bound to the UI Bootstrap `tab` directive's `disable` property.
 - `complete()` A function that returns a boolean indicating whether the tab is complete. This should be the same function that is bound to the tab's `bb-wizard-step-complete` property.

The `bbWizardNavigator` also exposes the following methods:

- `previousText()` Returns the text for the modal's Previous button. This usually doesn't change while the user interacts with the widget.
- `nextText()` Returns the text for the modal's Next button. This changes to "Finish" when the user is on the last step.
- `goToPrevious()` Navigates the user to the previous step.
- `goToNext()` Navigates the user to the next step.
- `previousDisabled()` Indicates whether the previous step is disabled. This should be bound to the `ng-disabled` property of the modal's Previous button.
- `nextDisabled()` Indicates whether the next step is disabled. This should be bound to the `ng-disabled` property of the modal's Next button.