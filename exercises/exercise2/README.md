# Exercise 2

Continue in your groups, support the same API as in ex1.

## New DB
- Replace `addons/db.js` with `db.js` from this folder.
- That adds support for multiple users into database. Read documentation about the new DB api from `/docs/db_version_2_docs`

## Authentication
- Replace `lib.js` with `lib.js` from this folder.
- It provides few helpers for the authentication such as `createToken` and `jwtCheck`
- Use those new helpers to implement endpoint for JWT-token creation
- Create account registration endpoint (As in create new user)
- Create login endpoint (create token for him/her if the username & password is correct)
- Create account registration endpoint
- Use the `jwtCheck`-middleware to force authentication on other API-endpoints

- `/api/todo` endpoints should return 401 without auth token and 403 with an invalid auth token

## Resource ownership
Our first version of the API just had "anonymous" ownership - nobody knows who created which task.
In many modern application you may want to have some kind of ownership for the different resources such as Tasks.

You know now who's your user if you check it from the JWT-token so your next step is to use the new DB and modify the endpoints to have that kind of ownership too.

When you have that kind of ownership you shouldn't let other users to get each others tasks without authorizing.

* all TODO resources should have an owner and only the current user's TODOs should be listed and available to update


## Tips
You might want to discover how Express.js's routers work.
It helps to organize your code and makes the authenticated/unauthenticated paths of your application more clear.
ie.
* TODO endpoints in one router
* AUTH endpoints in another router
Read more from https://expressjs.com/en/guide/routing.html#express-router


Read more about jwtCheck from here: https://github.com/auth0/express-jwt
You can access the username after that middleware from `req.user.username`
