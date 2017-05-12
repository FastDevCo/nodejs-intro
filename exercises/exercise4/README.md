# Exercise 4

Continue in your groups, support the same API as in ex1.

For this course we're using very small embedded database called **pouchdb** https://pouchdb.com/
Its written in Javascript and you could run it in client side (in browser) too.

However for production use it's little bit wrong choice and so usually people are developing to something completely different database from the beginning.

## Task

Have a conversation between your group and decide to migrate into some other database than the pouchdb-based
version used in course. Migrate into the "database of your selection" together by refactoring
`addons/db.js`

Make sure by running tests that your application still works after the migration.

Some popular alternatives:
- PostgreSQL (relational SQL)
- MariaDB (relational SQL)
- CouchDB (document based NoSQL)
- MongoDB (document based NoSQL)
- Redis (Key-Value store)
