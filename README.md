### Purpose

This tiny project showcases a pattern to disjunctively combine (_OR_) Express middlewares used as policies.

### Motivation

[Express](https://expressjs.com/) combines its [middlewares](https://expressjs.com/en/guide/writing-middleware.html) conjunctively (_AND_). This means that you can't skip a chain of middlewares by default to execute the last handler(s).

In one of the projects I worked in, users could be (super)admins (i.e. allowed to do everything) or “normal” with individual rights (e.g. access a module, view entities of a specific type, edit a specific entity).

While the check whether a user is an administrator is very fast, the check for the individual rights could be rather expensive (database lookups etc.). We don't need these checks if the user is an administrator.

### Implementation

The heart of this project is the simple [`./addRoute.js`](./addRoute.js). This is what you would use to register a route. What usually is a simple series of `callback` parameters now is split into four parts:

1. `authMiddlewares` – authenticate the user
2. `adminMiddlewares` – authorization: check whether they are an administrator
3. `nonAdminMiddlewares` – authorization: they are not an administrator, so check whether they have the individual rights
4. `middlewares` – normal, “non-policy” middlewares to be executed after either successful authorization; usually your business logic

The logic is simple yet effective: In Express, you can create [multiple handlers which match the same route](https://expressjs.com/en/starter/basic-routing.html). Inside a middleware, you can skip the rest of the middlewares of the current handler by calling `next('route')`. This either “falls through” to the next matching handler or leads to a response of “404 Not Found”.

When you need a user to be an administrator, you use a policy like [`./middlewares/isAdminStrict.js`](./middlewares/isAdminStrict.js). This immediately returns “403 Forbidden” when they are a simple user. So this is not suitable for our “admin shortcut” as being an administrator is just a “nice-to-have”, not a must.

Instead of returning immediately, we simply skip the `adminMiddlewares` and continue authorization with the `nonAdminMiddlewares`, as demonstrated in [`./middlewares/isAdmin.js`](./middlewares/isAdmin.js).

### Test

Start the application with `yarn start` or `node index.js <port>`.

There is one route: `/user/:userId`. You can find the list of users in [`./users.json`](./users.json).

(Yes, for simplicity’s sake, a user authorizes themself by entering their ID.)

Sample response for `/user/1`:
> Moin, *xehpuk*! The middlewares took **1ms**.

Sample response for `/user/2`:
> Moin, *Alfred*! The middlewares took **1002ms**.

*(“Moin” is a friendly informal greeting used in Northern Germany.)*

I have added a delay of 1s to the `nonAdminMiddlewares` to simulate a fast admin authorization and a slow non-admin authorization.
