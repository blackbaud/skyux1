####When to consider a wizard####

- A series of steps are truly modal - the system has questions for the user that must be answered before they can continue.
- The questions can be organized in to a reasonable number of static, linear categories.
- There is significant branching logic in the questions being answered. For example, decisions on step 1 may impact decisions on step 2.
- Have you considered a different construct to solve the problem? Why didn't that work?

####Anatomy of creating content in a wizard####

1. Wizards appear in a modal dialogue. The size of the modal depends on the content of the solution. Primary navigation is therefore suppressed with the lightbox overlay.
2. Steps that are completed have the light blue background, and are clickable.
3. The active step is Sky blue.
4. The step directly to the right of active is clickable.
5. The primary action on create is "Next" and is replaced by "Finish" on the last step.
6. "Save and close" is used in cases where it's acceptable for users to not complete the task in one sitting.
7. In the event the steps do not fit on the screen, OR steps are not named – collapse to numbered circles.