# Exercise 2

Continue in your groups, support the same API as in ex1.

* add Authentication and Users to the API with JSON Web Tokens.
* the API should support
  * registering a user
  * logging in
  * `/api/todo` endpoints should return 401 without auth token and 403 with an invalid auth token
  * all TODO resources should have an owner and only the curren't user's TODOs should be listed
* use Express Routers to modularise your code
  * TODO endpoints in one router
  * AUTH endpoints in another router
