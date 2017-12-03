# Fancy Hello World

A simple Node app ilustrating:

* Universal JavaScript. *Routing & Rendering with shared components, shared store, & shared routes.*
* State managed by Redux.
* Standard ES6 modules using Babel + webpack.
* React + JSX + ES7 object spread via Babel.
* Express 4.x.
* Useful scripts and conventions for app development.

# Fork of the Universal React Boilerplate by cloverfield-tools

## Link to the original repo:
[Universal React Boilerplate](https://github.com/cloverfield-tools/universal-react-boilerplate)

Why I made this project:
* Even though Universal React Boilerplate is deprecated in favor of Next.js, I think I still find this project helpful for having a starting point for my apps and also to show developers how to wire a project with server side rendering, hot reloading, babel, webpack, react and redux.
* To include hot reloading
* To use docker

## Getting Started

We're using an ES6 template string for the page skeleton + React to render the actual UI into the `root` div.

The React render happens on both the server and the client using shared code. React components are written in class-free style using [pure components](https://github.com/ericelliott/react-pure-component-starter) wherever possible.


```
yarn install
yarn run build:dev
yarn run dev
```

Now the app should be running at http://0.0.0.0:3000/

## Universal JavaScript

Universal JavaScript (aka *"isomorphic JavaScript"*) means that it's designed to run a lot of the same code on both the client and the server. Typically that includes a lot of rendering and domain logic.

There are many advantages to building apps this way, but the primary advantages are:

* **Cross-functional teams.** Since everything is written in JavaScript, it's easier to build teams who know how to work on both the client and server sides of the app.
* **Write once, run everywhere.** With the exception of a few library substitutions and browser polyfills, the code is shared, which means you have to write about half the code you'd write working on a non-universal app.
* **More productive developers.** Since the app is more consistent across the stack, there's no context switching when you need to maintain application behavior on both sides of the stack. Write the behavior once, and you're done. Context switching slows developers down significantly.


## Tech stack

The universal boilerplate uses standard JavaScript modules to author all of the code. All open-source modules are sourced from `npm`.


## What's inside?

There are some concerns that legitimately belong only on the server, or only on the client, so there are `client/` and `server/` directories for code that is specific to one or the other. Shared code goes in `shared/`:

* `source/shared`    - Shared code.
* `source/client` - For browser-only code.
* `source/server` - For server-only code.


## Index

The `server/index` route serves dynamic content. Static assets are served from the `build` folder using `express.static`.


## Scripts

Some of these scripts may require a Unix/Linux environment. OS X and Linux come with appropriate terminals ready to roll. On Windows, you'll need git installed, which comes with Git Bash. That should work. 

The `package.json` file comes with the following scripts that you may find useful:

* `yarn run dev` runs a client-only devserver
* `yarn run watch` runs a dev console that reports lint and unit test errors on save
* `yarn run lint` lints the code under the project folder with eslint
* `yarn run test` runs the commit tests and some smoketests
* `yarn run build` rebuilds the client and the server
* `yarn run deploy` creates a docker image
* `yarn run start` starts the created docker image in a container
* `yarn run stop` stops and removes the containers that run the image
* `yarn run test:e2e` runs nightwatch against the docker container
* `yarn run all` runs the deployment pipeline (fancy way to say all of the commands avove) 

To run a script, open the terminal, navigate to the boilerplate directory, and type:

```
yarn run <name of script>
```


### Start

Start the dev server.

```
yarn run dev
```

##
Log messages will be written to the console (stdout) in JSON format for convenient queries using tools like [Splunk](http://www.splunk.com/). You should be able to pipe the output to a third party logging service for aggregation without including that log aggregation logic in the app itself.


### Developer feedback console:

```
yarn run watch
```

The dev console does the following:

* Checks for syntax errors with `eslint` using idiomatic settings from `.eslintrc`
* Runs the unit tests and reports any test failures.
* Watches for file changes and re-runs the whole process.

## Requiring modules

To require modules relative to the app root, just put them in `source` and require them just like you would require a module installed by npm. For example, if you had a file called `source/routes/index.js` you can require it with:

```
import routes from 'routes';
```

This is a lot cleaner than using relative paths and littering your code with stuff like `../../../module/path/module.js`.

This requires the `NODE_PATH` environment variable to be set to `source`. For example from the `package.json`:

```js
  scripts: {
    "test": "NODE_PATH=source babel-node source/test/index.js",
  }
```

We also need to tell webpack configs (located in the project root) about the source path:

```js
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'source'),
    ]
  }
```
