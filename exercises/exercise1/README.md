# Exercise 1

Form groups of 2-3 students.

Create a basic API for [React intro](https://github.com/fastdevco/react-intro)
TODO application.

The API should behave according to the API documentation and you should be able to
test it by running the [React intro](https://github.com/fastdevco/react-intro) project.

No authentication or users is required. However, you should store state
using `addons/db.js` (documentation at `/docs/db_version_1_docs`)

Adding a TODO with a POST request should mean that
this TODO is listed by `GET /api/todos`.

Bonus challenge: use pair-programming

Hints:
* http://expressjs.com/en/starter/basic-routing.html
* http://expressjs.com/en/4x/api.html#req.body

* `lib.js` contains a function for UUIDs - you'll probably want to use that when creating tasks.


### API documentation


`GET /`

* returns a string (try this to test the API is running)

`GET /api/todos/`

* returns a JSON list of all tasks with 200 OK

```
[
  {
    "id": "1e01ba13-ea47-4d24-9131-d95c23d1bb8f",
    "done": false,
    "value": "Learn React"
  },
  ...
]
```


`POST /api/todos/`

* accepts a POST body (JSON) with following structure:
```
{
  "task": "string"
}
```

* creates the task and returns it with a 201 CREATED status.
```
{
  "id": "1e01ba13-ea47-4d24-9131-d95c23d1bb8f",
  "done": false,
  "task": "Learn React"
}
```

`PUT /api/todos/:id`

* accepst a body with any of the "id", "done" and "task" fields
  * partial updates accepted, eg: `{"task": "Learn Node.js"}`
* updates the task with the correct :id
* returns the updated task with 200 OK or 204 NO CONTENT
```
{
  "id": "1e01ba13-ea47-4d24-9131-d95c23d1bb8f",
  "done": false,
  "task": "Learn Node.js"
}
```

`DELETE /api/todos/:id`

* deletes the task by ID
* returns an empty object `{}` with 200 OK or 204 NO CONTENT
