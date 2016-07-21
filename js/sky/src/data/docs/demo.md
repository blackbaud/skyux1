---
name: Data
icon: database
summary: The data service provides access to convenience functions that allow you to manipulate data.
---

The `bbData` service provides methods to load and save data through web service endpoints.

### bbData functions ###

  - `load(loadObj)` &mdash; Takes an object with `data`, `resources`, and `text` properties and returns a promise that contains the result of an HTTP GET request. An `httpResults` property contains the results from the underlying calls to [Angular's `$http` service](https://docs.angularjs.org/api/ng/service/$http). The object includes metadata about the response such as the HTTP status code.
    - `data` &mdash; A URL or an object with multiple URLs to be requested. `result.data` contains the promise results. For example: `bbData.load({data: '/foo/data'})` or `bbData.load({data: {a: '/foo/data1', b: '/foo/data2'}})`. Requests to the URLs are made with credentials.
    - `resources` &mdash; A URL or an object with multiple URLs to be requested. `result.resources` contains the promise results. Requests to the URLs are made without credentials.
    - `text` &mdash; A URL or an object with multiple URLs to be requested. `result.text` contains the promise results. Requests to the URLs are made without credentials, and the result is returned as a string instead of an object.
    - `loadManager` &mdash; An object with `name` and `scope` properties that creates a wait while it and its child load managers retrieve data.
  - `query(url, queryParams)` &mdash; Creates a URL with a query string based on the queryParam's properties. For example: `bbData.query('/foo/search', {x: 'y', z: 123});` returns `/foo/search?x=y&z=123`.
  - `post(url, data)` &mdash; Within `bbData.load`, creates an HTTP POST request from a URL and data object. For example: `bbData.load({data: bbData.post('/foo/post', postData)});`.
  - `save(saveObj)` &mdash; A function that issues an HTTP POST request to store data on the remote server. It takes an argument with the `url`, `data`, and `type` properties.
    - `url` &mdash; The URL to send the request to.
    - `data` &mdash; The object to POST to the URL.
    - `type` &mdash; The HTTP verb to use with the request. *(Default: `POST`)* 
  - `cancel(promise)` &mdash; Takes a promise that `bbData.load` or `bbData.save` returns and cancels the underlying HTTP request. The promise is then rejected.