# Backend Engineer Test

## Expectations

You are expected to complete this test in an honest fashion. A successful submission will implement all of the required scenarios given below. Writing tests is not required, but is encouraged.

## Requirements

Each of the following scenarios must be completed.

Each of these endpoints will interact with the `pizza` or `pizza_order` tables in some way.

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

Given: `/orders`
When: A valid POST request is made and a pizza with the given `id` exists
Then: It should create a new order using the pizza with the given `id`

Given: `/orders`
When: An invalid POST request is made
Then: It should **not** create a new order

## Running the app

This application uses [Docker Compose](https://docs.docker.com/compose/overview/) in order to run a development environment
on your local machine.

You will need to have [Docker](https://store.docker.com/search?type=edition&offering=community) installed in order to use this.

Once you have this installed, here are some of the commands you'll want to use to interact with your application:

1. `docker-compose up`: Starts all of the containers listed in `docker-compose.yml`. If these containers haven't been built yet, they will be built for the first time.
    - If the containers you want to start have previously been built, `docker-compose up` will reuse those containers without rebuilding them. You can optionally specify the `--build` flag to re-build all of the containers, or use `docker-compose build`
      to do this.
    - Press `Ctrl + C` to stop the running containers.
2. `docker-compose down`: Stops and removes all running containers defined in `docker-compose.yml`.
3. `docker-compose ps`: Lists all running containers defined in `docker-compose.yml`.

After running `docker-compose up --build`, the app and database will start, and the app will be live at:

- `localhost:8080`, if you're taking the Java, Kotlin, or C# test.
- `localhost:5555`, if you're taking the Node test.

***Note for Linux users:*** Be sure to follow the Docker post-installation docs found [here](https://docs.docker.com/engine/installation/linux/linux-postinstall/). `docker-compose` may return errors if not configured correctly.

### Adminer

Adminer is a lightweight program to view database schemas and execute arbitrary database queries.  It is included as one of
the running containers in `docker-compose.yml`. While the container is running, visit the webapp by
clicking [here](http://localhost:8929/?pgsql=db&username=postgres&db=postgres&ns=public).

The password is `password`.

## Submitting

Please submit your solution by:

1. Creating a `.zip` archive with your source code and tests (please do not include any build output folders).
2. Upload your tests to a file hosting service, like Google Drive, Dropbox, etc. as Hy-Vee's email system will strip runnable code out of attachments for security reasons.
3. Send a link to your completed test back to the person who sent it to you.

After you submit your solution to us, we will take the following steps to test out your solution:

1. We will run all of the tests in the project. Please note that if you decided not to implement any of your own tests, we are still going to do this to make sure that any of the existing tests don't fail.
    - For the Java/Kotlin test, we'll run `gradle test`.
    - For the C# test, we'll run `dotnet test ./PizzaAPI.Tests/PizzaAPI.Tests.csproj`
    - For the Node test, we'll run `yarn test`.
2. We will destroy our current `docker-compose` environment by running `docker-compose rm -f`.
3. We will rebuild the images so we can see the changes you made by running `docker-compose build`
4. We will start your solution by running `docker-compose up`.
5. We will review the new controllers you have added and attempt to use Postman to send requests to them.
6. If you wrote any documentation around the new endpoints you created, we'll review it and try to use them.
