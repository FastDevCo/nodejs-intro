# Exercise 2

Continue in your groups, support the same API as in ex1.

## New DB
- Replace `addons/db.js` with `db.js` from this folder.
- That adds support for multiple users into database. Read documentation about the new DB api from `/docs/db_version_2_docs`

## Tests
Update also tests, new ones have tests modified for users and authentication.
copy `test.js` to your `base/test/test.js`

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


# Usage with frontend application
After you have implemented all the api-endpoints and your server will pass the test-suite it's time to try it with an actual application.

### Steps to follow

#### First pull the repository
```
git clone -b use-api https://github.com/FastDevCo/react-intro.git
```
#### Install dependencies
```
cd react-intro/example_solution
npm install
```

#### Build the frontend application and run the build
```
npm run build
npm run server
# This will print out url like http://127.0.0.1:8080 to visit with your browser
# Use your web browser and try out the frontend application with your API-server
```
#### If it works, your done! Good job!


## Tips
You might want to discover how Express.js's routers work.
It helps to organize your code and makes the authenticated/unauthenticated paths of your application more clear.
ie.
* TODO endpoints in one router
* AUTH endpoints in another router
Read more from https://expressjs.com/en/guide/routing.html#express-router


Read more about jwtCheck from here: https://github.com/auth0/express-jwt
You can access the username after that middleware from `req.user.username`
