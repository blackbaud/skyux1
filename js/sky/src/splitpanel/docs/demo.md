---
name: Split Panel
icon: newspaper-o
summary: The Split Panel component gives the workspace to list and provide edit and go functionality.
---

The SplitPanel component provide convenient way to edit and go functionality. Component have two container one for list and other workspace to show detail of selected item.
Existing sky component [Listbuilder](../listbuilder) is used to show list in the left panel.

###Splitpanel directive###

`bb-splitpanel ` &mdash; container for the entire split panel.

`bb-listbuilder ` &mdash; [Listbuilder](../listbuilder) is existing sky component which is used to show items in list. 

`bb-listbuilder-toolbar ` &mdash; Component for the Listbuilder toolbar. its sub components can be refer from [Listbuilder](../listbuilder).

`bb-listbuilder-content ` &mdash; listbuilder custom item 

	- `bb-splitpanel-container ` &mdash; Container for splitpanel  

		- `bb-splitpanel-list-panel ` &mdash; Draggable container for splitpanel list section having `max-width-in-percentage ` and `min-width-in-percentage ` to set maximum and minimum width of this panel.
		
			- `bb-splitpanel-list-fixed-header ` &mdash; Placeholder for fixed header in left Panel.
				
				- `bb-splitpanel-list-fixed-header-item ` &mdash; Placeholder for fixed header item.   
				
				- `bb-splitpanel-list-fixed-header-filter ` &mdash; Placeholder for fixed header filter. 
	 
			- `bb-splitpanel-list ` &mdash; Placeholder for list. 
			
			- `bb-splitpanel-empty-list ` &mdash; Tempalate for message when list is empty. 
			
`bb-splitpanel-workspace  ` &mdash; Container for workspace panel.  

	- `bb-splitpanel-workspace-container ` &mdash; workspace for detail of selected item. This can be treat as stand alone page.

	- `bb-splitpanel-workspace-footer ` &mdash; Placeholder for action buttons in footer of workspace.



###Mobile version directive###

`bb-splitpanel-mobile-workspace-header ` &mdash; Workspace header visible only on mobile version.

`bb-splitpanel-mobile-selected-item ` &mdash; Placeholder to show selected item in detail page of mobile version.

`bb-splitpanel-mobile-list-back ` &mdash; Component to navigate back on list screen in mobile version.
	- `bb-splitpanel-list-back-click ` &mdash; Event handler for back event.

`bb-splitpanel-mobile-list-next ` &mdash; Component to navigate to next item on detail screen in mobile version.
	- `bb-splitpanel-list-next-click ` &mdash; Event handler for next event.

`bb-splitpanel-mobile-list-previous ` &mdash; Component to navigate to previous item on detail screen in mobile version.
	- `bb-splitpanel-list-previous-click ` &mdash; Event handler for previous event.


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
 



