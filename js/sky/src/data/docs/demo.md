---
name: Data
icon: database
summary: The data service provides access to convenience functions that allow you to manipulate data.
---

The data service provides methods to load data and save data through web service endpoints.

### bbData Functions ###

  - `load(loadObj)` &mdash; Takes an object with `data`, `resources`, and `text` properties and returns a promise that contains the result of an HTTP GET request. An `httpResults` property contains the results from the underlying calls to [Angular's `$http` service](https://docs.angularjs.org/api/ng/service/$http). The object includes metadata about the response such as the HTTP status code.
    - `data` &mdash; Specifies a URL to request or an object with multiple URLs to request. `result.data` contains the promise results. For example: `bbData.load({data: '/foo/data'})` or `bbData.load({data: {a: '/foo/data1', b: '/foo/data2'}})`. Requests to the URLs are made with credentials.
    - `resources` &mdash; Specifies a URL to request or an object with multiple URLs to request. `result.resources` contains the promise results. Requests to the URLs are made without credentials.
    - `text` &mdash; Specifies a URL to request or an object with multiple URLs to request. `result.text` contains the promise results. Requests to the URLs are made without credentials, and the results are returned as strings instead of objects.
    - `loadManager` &mdash; Specifies an object with `name` and `scope` properties that creates a wait while it and its child load managers retreive data.
  - `query(url, queryParams)` &mdash; Creates a URL with a query string based on the queryParam's properties. For example: `bbData.query('/foo/search', {x: 'y', z: 123});` returns `/foo/search?x=y&z=123`.
  - `post(url, data)` &mdash; Within `bbData.load`, creates a post request from a URL and data object. For example: `bbData.load({data: bbData.post('/foo/post', postData)});`.
  - `save(saveObj)` &mdash; Issues an HTTP post to store data on the remote server. Takes an argument with the `url`, `data`, and `type` properties.
    - `url` &mdash; Specifies the URL to send the request to.
    - `data` &mdash; Specifies the object to POST to the URL.
    - `type` &mdash; Specifies the HTTP verb to use with the request. *(Default: `POST`)* 
  - `cancel(promise)` &mdash; Takes a promise returned by `bbData.load` or `bbData.save` and cancels the underlying HTTP request. The promise is then rejected.