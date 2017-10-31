# backend-engineer-test

[[toc]]

# Overview
Our online pizza ordering system provides a handful of preset pizza combinations to choose from, but customers are unhappy
with these limited options and want the ability to custom-order a pizza. Employees are unhappy that they're unable to add
to the base menu of pizza presets.

Your job is to take the current API and expand upon it by adding a few endpoints that will allow our customers and employees
to do this.

# Current State

Right now, our API exposes a few endpoints that some user interface uses to allow customers to interact with our website:

| Route                      | Method | Description                                                                                |
|----------------------------|--------|--------------------------------------------------------------------------------------------|
| `/pizzas`                  | GET    | Returns a list of pizza presets in JSON format                                             |
| `/pizzas/{pizzaId}/orders` | POST   | Given the ID of the preset (`pizzaId`), create an order in the DB using its ingredients    |

We also have a couple of tables in our PostgreSQL database that these routes interact with.  You can look at the schema for
these tables in the initial database script that is automatically run when starting the app for the first time
(`postgres/01_schema.sql`).

# Expectations

1. Create an endpoint that allows employees to add their own custom pizza preset to the `pizza` table.  It is up to you
   to decide what the route should be, but the method should be a POST, and the body of the request should contain all
   of the fields needed to create an entry in the `pizza` table.
2. Create an endpoint that allows customers to order their own custom pizza without selecting from the available presets.
   It is up to you to decide what the route should be, but the method should be a POST, and the body of the request should
   contain all of the fields needed to create an entry in the `pizza_order` table.
3. Use `joi` to add validation around the two routes you created.  This will allow our API to respond with an HTTP 400
   (Bad Request) if a field is missing, or is the incorrect type.  You can find a very simple example of its usage in
   `src/controllers/order-controller.js`.  The documentation for this module can be found [here](https://github.com/hapijs/joi/blob/v10.6.0/API.md),
   and information about its usage with `hapi` can be found [here](https://hapijs.com/tutorials/validation).
4. The database schema that we have provided you is not great, and we encourage you to improve it in any way that you see
   fit.  If you'd like to make changes to the schema, please create some [migration scripts](#migration-scripts) to facilitate those changes.
5. (Optional) Write tests! At Hy-Vee, all new projects are test-driven, and every line of production code is covered by a
   test.  You can find the tests we have already written in the `test` folder, and they can be executed by running `npm test`.
   If you decide to do this (and we encourage you to do so), remember that we don't expect you to write perfect tests on
   your first try.  Take a look at the tests we've already written and see if you can use those to write some simple tests
   around the code you added.  For these tests, we use [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/api/bdd/),
   [Sinon](http://sinonjs.org/releases/v4.0.1/), and [Chance](http://chancejs.com/).
6. When you are finished, please create a `.zip` file containing everything in this directory, except for the `node_modules`
   folder, and send it back to us.  One of our team members will review your solution and get back to you.

# Running the app

This application uses [Docker Compose](https://docs.docker.com/compose/overview/) in order to run a development environment
on your local machine. Docker Compose allows developers to define applications that depend on multiple resources (in this
case, a Node.JS application and a PostgreSQL database) and work with them in an isolated environment.  You can view the
`docker-compose.yml` file to view the details about the environment and what ports are exposed for each container.

You will need to have [Docker](https://store.docker.com/search?type=edition&offering=community)
installed in order to use this.

Once you have this installed, here are some of the commands you'll want to use to interact with your application:

1. `docker-compose up`: Starts all of the containers listed in `docker-compose.yml`. If these containers haven't been built
   yet, they will be built for the first time.
    - If the containers you want to start have previously been built, `docker-compose up` will reuse those containers without
      rebuilding them. This means that any changes you make to your app won't be visible until that container is rebuilt.
      You can optionally specify the `--build` flag to re-build all of the containers, or use `docker-compose build` to do this.
    - If you don't want to run every container, you can optionally list only the ones you care about.  For example, if you
      only wanted to run the database so you can run the Node.JS app on your host machine, you would run
      `docker-compose up db`.
    - Pressing `Ctrl + C` while this is running will send a `SIGINT` to all of the running processes to gracefully stop them.
      Pressing it twice will send a `SIGKILL` and forcefully terminate them.
2. `docker-compose down`: Stops and removes all running containers defined in `docker-compose.yml`.
3. `docker-compose ps`: Lists all running containers defined in `docker-compose.yml`.
4. `docker-compose build`: Builds (or re-builds) all containers defined in `docker-compose.yml`.
5. `docker-compose rm`: Completely removes all containers defined in `docker-compose.yml` and any created volumes on the
   host machine. This is useful if you want to run the migration scripts against your PostgreSQL database.

After running `docker-compose up --build`, the app and database will start, and the app will be live at `localhost:5555`.
Any changes made in your local `src` folder will automatically reload the app, so you can view those changes instantly.

# Tips

Here are some tips and tricks that might help you while working on this test.

## Adding to the Application

The Node.JS application is powered by a server framework called [hapi](https://hapijs.com/).

All of the application configuration has already been handled for you. This configuration can be found in `src/server.js`,
`src/server-services.js`, and `src/postgres-service.js`, and it is very likely that you will not need to change anything in
these files.  If you do decide to change something in these files, make sure that the underlying tests do not break as a result
of those changes.

Since you will be adding a couple of new API endpoints in this test, you are going to want to create a couple of new
`.js` files in the `src/controllers` folder.  Each of these files will need to export a function that returns a
[route configuration object](https://hapijs.com/api#route-configuration), and these exported routes will automatically
be added to the server when it starts.

As an example, the following code placed in a file such as `src/controllers/test-controller.js` will generate a "Hello World"
response when visiting `/test` in your browser:

**`src/controllers/test-controller.js`**

```js
const testController = () => ({
    handler: (request, reply) => {
        reply('Hello World');
    },
    method: 'GET',
    path: '/test'
});

module.exports = testController;
```

## Migration Scripts

Database migration scripts can be used to easily migrate your schema from one version to the next.  The initial schema that
you were provided is not great (by design), and we encourage you to write a migration script to make it better.

Migration scripts exist as `.sql` files in the `postgres` folder.  When the PostgreSQL image is built, all of the `.sql` files
will be copied to the container, and they will be executed in alphabetical order when the container is first ran.

If you'd like to make a change to the initial schema, please **do not** modify the `01_schema.sql` file; instead, make another
file that will alter the table created in `01_schema.sql`.  In order to make sure these are executed in alphabetical order,
try to follow the file naming convention that we have already established.  As an example, you may want to choose a name that
looks something like this: `02_migrate_schema.sql`.

After creating a new `.sql` file in the `postgres` folder, you can run this migration script by following these steps:

1. Remove any running containers and existing volumes: `docker-compose rm -f`
2. Re-build the PostgreSQL image: `docker-compose build db`
3. Start the app: `docker-compose up`

You should see some log messages that indicate that your new migration scripts have successfully ran.

## Adminer

Adminer is a lightweight program to view database schemas and execute arbitrary database queries.  It is included as one of
the running containers in `docker-compose.yml`, and you can use it to test your queries before adding them to your app.
While the container is running, visit the webapp by clicking [here](http://localhost:8080/?pgsql=db&username=postgres&db=postgres&ns=public).
The password is `password`.

## REST Client

Since you will be working on extending a REST API and building new endpoints, you will need a tool to help you make HTTP requests
to the endpoints you create.  We recommend installing [Postman](https://www.getpostman.com/) to assist with this.

## After you submit

After you submit your solution to us, we will take the following steps to test out your solution:

1. We will run all of the tests in the `test` folder by running `npm test`.  Note: if you decided not to implement any of
   your own tests, we are still going to do this to make sure that any of the existing tests don't fail.  If you decide to
   make any changes to the JavaScript files you were given, please make sure that any of the existing tests don't break
   as a result of your changes.
2. We will destroy our current `docker-compose` environment by running `docker-compose rm -f`.
3. We will rebuild the images so we can see the changes you made by running `docker-compose build`
4. We will start your solution by running `docker-compose up`.
5. We will review the new controllers you have added and attempt to use Postman to send requests to them.  We will also
   look at any migration scripts you've written, and see how your schema changes have impacting the code you were given.
   If you wrote any documentation around the new endpoints you created, we'll review it and try to use them.
