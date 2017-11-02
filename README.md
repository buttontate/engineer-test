# backend-engineer-test

Our online pizza ordering system provides a handful of preset pizza combinations to choose from, but employees are
unhappy that they're unable to add to the base menu of pizzas, update existing pizzas on the menu, or remove pizzas
that aren't selling well.

We've enlisted your help to design an API that provides the functionality that our employees need.

## Expectations

Create an API that offers the following functionality:

- Fetching a list of all pizzas on the menu
- Adding a pizza to the menu
- Updating a pizza on the menu
- Removing a pizza from the menu
- Creating an order using one of the pizzas on the menu

Each of these endpoints will interact with the `pizza` or `pizza_order` tables in some way.

You can use the following criteria to help you with your implementation:

---

Given: `/pizzas`  
When: A valid GET request is made  
Then: It should respond with a list of all pizzas on the menu

Given: `/pizzas`  
When: A valid POST request is made  
Then: It should add a new pizza to the menu

Given: `/pizzas`  
When: An invalid POST request is made  
Then: It should **not** add a new pizza to the menu

Given: `/pizzas/{id}`  
When: A valid PUT request is made and a pizza with the given `id` exists  
Then: It should update the pizza with the given `id`

Given: `/pizzas/{id}`  
When: An invalid PUT request is made  
Then: It should **not** update the pizza with the given `id`

Given: `/pizzas/{id}`  
When: A valid DELETE request is made and a pizza with the given `id` exists  
Then: It should remove the pizza with the given `id` from the menu

Given: `/pizzas/{id}`  
When: An invalid DELETE request is made  
Then: It should **not** remove the pizza with the given `id` from the menu

Given: `/orders/pizzas/{id}`  
When: A valid POST request is made and a pizza with the given `id` exists  
Then: It should create a new order using the ingredients from the pizza with the given `id`

Given: `/orders/pizzas/{id}`  
When: An invalid POST request is made  
Then: It should **not** create a new order

## Running the app

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
      rebuilding them. You can optionally specify the `--build` flag to re-build all of the containers, or use `docker-compose build`
      to do this.
    - If you don't want to run every container, you can optionally list only the ones you care about.  For example, if you
      only wanted to run the database so you can run the Node.JS app on your host machine, you would run
      `docker-compose up db`.
    - Pressing `Ctrl + C` while this is running will send a `SIGINT` to all of the running processes to gracefully stop them.
      Pressing it twice will send a `SIGKILL` and forcefully terminate them.
2. `docker-compose down`: Stops and removes all running containers defined in `docker-compose.yml`.
3. `docker-compose ps`: Lists all running containers defined in `docker-compose.yml`.
4. `docker-compose build`: Builds (or re-builds) all containers defined in `docker-compose.yml`.
5. `docker-compose rm`: Completely removes all containers defined in `docker-compose.yml` and any created volumes on the
   host machine.

After running `docker-compose up --build`, the app and database will start, and the app will be live at `localhost:5555`.
Any changes made in your local `src` folder will automatically reload the app, so you can view those changes instantly.

**Note for Linux users:** Be sure to follow the Docker post-installation docs found [here](https://docs.docker.com/engine/installation/linux/linux-postinstall/).
`docker-compose` may return errors if not configured correctly.

## Tips

Here are some tips and tricks that might help you while working on this test.

### Adding to the Application

The Node.JS application is powered by a server framework called [hapi](https://hapijs.com/).

All of the application configuration has already been handled for you. This configuration can be found in `src/server.js`,
`src/server-services.js`, and `src/postgres-service.js`, and it is very likely that you will not need to change anything in
these files.  If you do decide to change something in these files, make sure that the underlying tests do not break as a result
of those changes.

Since you will creating API endpoints in this test, you are going to want to create a couple of new
`.js` files in the `src/controllers` folder.  Each of these files will need to export a function that returns a
[route configuration object](https://hapijs.com/api#route-configuration), and these exported routes will automatically
be added to the server when it starts.

An example controller that responds with the current time has been provided in `src/controllers/example-controller.js`

### Request Validation

Joi, a module we commonly use for request validation, has been provided for you to use.  You are free to install another module
or roll your own solution if your would prefer.

The API documentation for Joi can be found here: https://github.com/hapijs/joi/blob/v10.6.0/API.md
Documentation for using Joi with Hapi can be found here: https://hapijs.com/tutorials/validation

### API Errors

Boom, a module we commonly use to send error responses, has been provided for you to use.  You are free to install another module
or roll your own solution if you would prefer.

The API documentation for Boom can be found here: https://github.com/hapijs/boom

### Tests

A test suite that covers all of the code you were provided can be found in the `test` folder, and it can be executed by running
`npm test`.  You are not required to add new tests, but you are encouraged to do so.  If you want to try writing your own tests,
remember that we don't expect you to write perfect tests on your first try.  Take a look at the tests we've already written and
see if you can use those to write some simple tests around the code you added.

For these tests, we use the following libraries:

- Mocha (test framework): https://mochajs.org/
- Chai (assertions): http://chaijs.com/api/bdd/
- Sinon (mocking and stubbing): http://sinonjs.org/releases/v4.0.1/
- Chance (random value generator): http://chancejs.com/

### Adminer

Adminer is a lightweight program to view database schemas and execute arbitrary database queries.  It is included as one of
the running containers in `docker-compose.yml`, and you can use it to test your queries before adding them to your app.
While the container is running, visit the webapp by clicking [here](http://localhost:8080/?pgsql=db&username=postgres&db=postgres&ns=public).
The password is `password`.

### REST Client

Since you will be working on extending a REST API and building new endpoints, you will need a tool to help you make HTTP requests
to the endpoints you create.  We recommend installing [Postman](https://www.getpostman.com/) to assist with this.

### Submitting

Please submit your solution by creating a `.zip` archive with your source code and tests and sending it back to the person who
sent it to you.  Please do not include the `node_modules` folder.

After you submit your solution to us, we will take the following steps to test out your solution:

1. We will run all of the tests in the `test` folder by running `npm test`.  Note: if you decided not to implement any of
   your own tests, we are still going to do this to make sure that any of the existing tests don't fail.  If you decide to
   make any changes to the JavaScript files you were given, please make sure that any of the existing tests don't break
   as a result of your changes.
2. We will destroy our current `docker-compose` environment by running `docker-compose rm -f`.
3. We will rebuild the images so we can see the changes you made by running `docker-compose build`
4. We will start your solution by running `docker-compose up`.
5. We will review the new controllers you have added and attempt to use Postman to send requests to them.  If you wrote any
   documentation around the new endpoints you created, we'll review it and try to use them.
