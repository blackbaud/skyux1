---
name: Split Panel
icon: newspaper-o
summary: The Split Panel component gives the workspace to list and provide edit and go functionality.
---

The SplitPanel component provide convenient way to edit and go functionality. Component have two container one for list and other workspace to show detail of selected item.
Existing sky component [Listbuilder](../listbuilder) is used to show list in the left panel.

###Splitpanel directive###

`bb-listbuilder ` &mdash; [Listbuilder](../listbuilder) is existing sky component which is used to show items in list. 

`bb-listbuilder-toolbar ` &mdash; Component for the Listbuilder toolbar. its sub components can be refer from [Listbuilder](../listbuilder).

`bb-listbuilder-content ` &mdash; listbuilder custom item 

	- `bb-splitpanel-list-header ` &mdash; Fixed header in left panel 
	 
	- `bb-splitpanel-list-item ` &mdash; Attribute that should be placed on an individual custom item in the listbuilder. 

`bb-splitpanel-workspace  ` &mdash; Container for workspace panel  

	- `bb-splitpanel-workspace-container ` &mdash; workspace for detail of selected item. This can be treat as stand alone page.

	- `bb-modal-footer ` &mdash; Placeholder for action buttons.



###Mobile version directive###

`bb-splitpanel-mobile-workspace-header ` &mdash; Workspace header visible only on mobile version.

`bb-splitpanel-mobile-selected-item ` &mdash; Placeholder to show selected item in detail page of mobile version.



###CheckDirtyForm service###

`init` &mdash; Provide object of service to perform metioned operations. We can pass mentioned options to initialize the service. 

		- `options.enableFormDirtyCheck ` &mdash; Enable dirty check.

		- `options.forms` &mdash; Form object of workspace.

		- `options.action1Callback ` &mdash; Callback method which will call after action 1 clicked.

		- `options.action2Callback ` &mdash; Callback method which will call after action 2 clicked.

		- `options.bbModal ` &mdash; Object of bbmodal component injected in page.

`bbCheckDirtyForm.checkDirtyForm` &mdash; Check the form and prompt with confirm dialog with options save, doNotSave and cancel.

`bbCheckDirtyForm.setDirtyFormDefault` &mdash; Set form as pristine.

`bbCheckDirtyForm.invokeMethodWithParameters` &mdash; Invoke the passed method with parameter.





###Accessibility###
Splitpanel provides following accessiblity scenario:
1. On click of any item in list item will get the focus.
2. Provide navigation by up/down arrow between items in the list
 



