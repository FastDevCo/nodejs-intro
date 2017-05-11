# Nodejs intro by Emblica & FastDevCo

**WIP**

Currently this project contains a Node.js API that can be used with example application from [React intro](https://github.com/fastdevco/react-intro). Some of the later exercises move from using localStorage to using an API.

### Usage

```
npm install
node index.js
```

* if you need a different port:

```
PORT=7777 node index.js
```

### API documentation

* Note: we use in-memory storage so you'll lose state on restart.

`GET /`

* returns a string (try this to test the API is running)

`GET /api/todos/`

* returns a JSON list of all tasks


`POST /api/todos/`

* accepts a body with following fields:
```
{
  "task": "string"
}
```

* creates the task and returns it:
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
* returns the updated task:
```
{
  "id": "1e01ba13-ea47-4d24-9131-d95c23d1bb8f",
  "done": false,
  "task": "Learn Node.js"
}
```

`DELETE /api/todos/:id`

* deletes the task by ID
* returns an empty object `{}`
