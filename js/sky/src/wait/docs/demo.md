---
name: Wait
icon: spinner
summary: The wait component disables an element in a waiting state and visually indicates that it is in a waiting state.
---

The wait component allows you to disable and visually indicate that an element is in a waiting state.
When `bb-wait` is set to true, the element will initially be blocked with a clear mask, but after 300ms a visual indicator will cover the element as well.
This will allow for the element to immediately be disabled but not cause visual disturbances for very brief waits.

### Dependencies ###

 - **[jquery.blockUI.js](http://malsup.com/jquery/block/) (2.66.0-2013.10.09 or higher)**

---

If the value bound to `bb-wait` is truthy, then the element will begin waiting until the value becomes falsey.

### Multiple waits ###
You can set the value of `bb-wait` to a numeric value to track a count of simultaneous waits.
When waits are added, increment the wait count and when they are removed then decrement the count.
This will cause the wait UI to only clear once all waits are removed.

### Full-page waits ###
If bb-wait is added to the `<body>` tag, then a full-page version of the wait UI will be created.

### Raising wait events ###
Wait events can be raised from one controller to another by calling `$scope.$emit("bbBeginWait");` and `$scope.$emit("bbEndWait");` respectively.
A controller can capture that event and begin waiting its element by listening for the event and updating its own `bb-wait` component.
When doing so, itshould call `stopPropagation()` on the event so that other parents won't catch it as well.
Uncaught events will raise all the way to the main controller of the application which can cause the entire page to wait.

    $scope.$on("bbBeginWait", function (event) {
        event.stopPropagation();
        $scope.myElementWaitCount += 1;
    });

### Wait service ###
In addition to the `bb-wait` component, a `bbWait` service exists to allow functional access to adding and removing waits on elements or the page as a whole.
This service supports the following functions

 - `beginElWait(element)` &mdash; Adds a wait for the specified element. Implicitly tracks a wait count for the element.
 - `endElWait(element)` &mdash; Removes a wait for the specified element. Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearElWait(element)` &mdash; Removes all waits for the specified element and will clear any wait UI.
 - `beginPageWait()` &mdash; Adds a wait for the whole page (same as body element). Implicitly tracks a wait count for the element.
 - `endPageWait()` &mdash; Removes a wait for the whole page (same as body element). Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearPageWait()` &mdash; Removes all waits for the whole page (same as body element) and will clear any wait UI.