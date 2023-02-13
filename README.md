# My Startup Progress

## Up and Running

This application was developed using the latest LTS version of Node.js (currenly v18.14.0).

To run the server locally, make sure you first install the dependencies, by using npm for instance:

```sh
npm install
```

And then run the `start-dev` script:

```sh
npm run start-dev
```

> The application will run on the port `3000` by default, but it can be changed by setting the `PORT` environment variable.

Now, to run the tests:

```sh
npm test
```

## Deployment

We are using [Fly](fly.io) as our cloud provider and the deployment is done automatically once a commit is pushed into the `main` branch.

The graphql endpoint can be accessed at https://frosty-hill-3862.fly.dev/graphql.

Note that we also have `graphiql` enabled on the following URL: https://frosty-hill-3862.fly.dev/graphiql.

## Notes

We have the CI pipeline enable for Pull Requests, you can check the [open one regarding reopening tasks](https://github.com/hails/oakslab-startup-progress/pull/7) to see how it works.
