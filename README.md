# backend-engineer-test

## Overview
Our pizza ordering system provides a handful of preset pizza combinations to choose from, but customers are unhappy with these limited options and want the ability to custom-order a pizza. 
Employees are unhappy that they're unable to add to the base menu of pizza presets. We need a better system.

Given the current, limited system of selecting pizzas for order, make a better way to order a custom pizza, and a way for employees to add pizzas to the menu.
Customers should be able to select from a list of presets or build a personalized pizza, and employees should be able to edit preset pizzas.

## Expectations
Create some endpoints for customizing and ordering pizzas.
We should be able to utilize your code to build and price a personalized pizza (any combination of toppings, crust, and sauce) and also retrieve a list of pizza presets. 
We have provided an example `/pizzas` route that returns the contents of the existing `pizza` table.

We encourage you to write tests, and we have included tests for the provided `/pizzas` endpoint for your reference.

You should .zip your solution (except for node_modules) and send it back to us when you are finished.

## Running the app
Things you need:
* [docker](https://www.docker.com/community-edition#/download)
* [node](https://nodejs.org/en/download/)

When we receive your test, we will run it using:
```bash
docker-compose up --build
```
The `--build` flag will rebuild the service before starting the container

Tests will run when you run `docker-compose` but you can run tests at any time using:
```bash
npm test
```

## Tips

1. Adminer, a lightweight program to view database schemas and execute queries, is included in the docker-compose
schema.  You can access it by visiting http://localhost:8080/?pgsql=db&username=postgres&db=postgres&ns=public after
starting `docker-compose up`.
2. The `.sql` files located in the `postgres` directory will be executed in alphabetical order whenever a new PostgreSQL
image is built.  A new image will be built every time you run `docker-compose up` with the `--build` flag. You will want
to follow our naming convention that we have established (your next new `.sql` file would start with `02`).
