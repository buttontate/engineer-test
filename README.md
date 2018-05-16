# backend-engineer-test

> A coding test that can be used for interview candidates.

This repo is a collection of backend engineer tests implemented in different languages/frameworks.

## Sending a test to a candidate

1. Create a zip of the language you want the candidate to complete the test in:
    - `make java-test`
    - `make nodejs-test`
2. Email the newly created zip file.

## Validating a submission

1. `cd` into project directory of submission.
2. Run all the automated tests in the particular submission.
3. Destroy any existing docker compose configuration `docker-compose rm -f`.
4. Start submission `docker-compose up --build`
