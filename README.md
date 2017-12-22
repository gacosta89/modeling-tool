# Modeling Tool

A simple Box Modeling tool for documenting devices:

## Demo of what you can generate with this tool

![Model demo](https://raw.githubusercontent.com/gacosta89/modeling-tool/develop/demo/model.gif)

## Edit Mode 

![Edit Model](https://raw.githubusercontent.com/gacosta89/modeling-tool/develop/demo/edit.gif)

## Live in 

* [Modeling Tool](https://gacosta89.github.io/modeling-tool/#/)

## Features: 

* Create, resize, move boxes
* Name this boxes and add a description
* Undo Redo
* Auto save history and pics to local storage
* Preview Mode
* Generate an interactive model to share your work

## Prerequisites

Node JS:

* [Node.js LTS](https://nodejs.org/es/download/)

Yarn: 

* [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

```
yarn install
yarn run build
yarn run start
```

Now the app should be running at http://localhost:8080/

## Architecture

The architecture is redux. And it consists of the following components:

* Actions for describing user events, like create, toggle, tap, select.
* Store for keeping the state of the app and reducers.
* Reducers for the business logic.
* Selectors as an encapsulation of the tree state shape.
* React components as the presentational layer.
* Sagas for IO/networking (side effects) and coordinating async flows

It has a unidirectional flow, meaning the pipeline starts by dispatching an action 
to the store, the store takes the action and the current state and calls the reducer which
will compute the next state. 

After every action is dispatched and the next state computed, the store will call its 
listeners, e.g. presentational components, to notify there's a new state available.

Components will execute selectors on the new state to get their required props, thus 
abstracting the component from the tree state shape. 

* Note: selectors are smart enough to detect if the pice of the state they are observing 
changed by immutable checks and only recompute if the data has changed.

* Note: components are smart enough to detect if at least one of the props computed 
by selectors have changed by immutable checks and only then re-render the component.

Finally sagas are async workers that sit and observe the flow of actions, and when
the right action is triggered or the right flow is acomplished then do a task 
(fetch data from back end, save data, write the local storage).


## Benefits

I find this architecture beautiful and elegant, because it is simple. 

### High separation of concerns: 

* Good design is about decomposing a complex problem and work on a particular 
piece of the problem at a time. This has to do with the limitation of our brain of not 
being able to think about many things at once.

* We can't predict the future but we can create a flexible codebase to adapt easilly 
when the time comes. High separation of concerns creates an inherently flexible codebase.

* Separation of concerns at multiple levels, not only high level layers, ergo decompsition, creates this highly reusable single responsability components that can be combined 
in other ways to add new features or even create a entire new application.

* It is super easy to unit test components, and this is done without mocking dependencies 
thanks to this high level of separation of concerns. Unit testing is a necesary condition
for software quality. We can make unit tests for every piece of the architecture, reducers, presentational components, even for sagas side effects.


### Simplicity

* An inherently simple architecture allows team members to reason about
the app quickly. Also, for new members to shorten the ramp-up time, as they have to learn
the architecture once, and be confident that this will be the standard way through the whole app. 

* From the previous point derives an increase in productivity.

* You get an intuition of where a bug might be located, in which layer, which component.

* An simple codebase allows agility. If your codebase is complex and your's competitor is simple,
he will be able to move from A to B straightforward while you try to move the elephant 
of complexity of your codebase. How good you can get at moving an elephant?


## Cons

### Boilerplate

* Boilerplate, although I don't see it as a con but a sacrifice for all previous points.
If we evaluate trade-offs, benefits win over cons.

I have an article about this called [The truth behind redux boilerplate](https://medium.com/@graccba/the-truth-behind-redux-boilerplate-6af98492d45d)

## In deep rationale

I've written down more in deep rationale of each piece of the architecture components.

* Reducers and actions: `shared/model/reducer/index.js`
* Reducers (handlers): `shared/model/reducer/handlers.js`
* Selectors: `shared/model/selectors/style.js`
* Presentational Components: `shared/model/view/drawingArea.js`
* Presentational Components: `shared/model/view/renderingArea.js`
* Sagas (IO): `shared/pics/sagas.js`

I hope by reading this rationales and the explanation of the architecture, 
you can go through other domains and understand their structure as well.

## Improvements / New features

* Improve the interactions with tooling, as they are a bit basic.

* Be able to specify relations between components, and show them interactivelly.

* Mirror mode for edition/creation. As immediate feedback of what a creative person 
is doing is super important to have. In this mode you will have 2 windows, the editor 
window and mirror window and you will see live how your changes affect what you are creating (the interactive model)

* Fix exeded quota when saving images to the local storage

## Wireing and Configuration

The main entry point of the client app is `client/index.js`, and this is
were most of the wireing is done.

Top level components are found in the app domain `shared/app`, reducer, sagas, main (top level presentational component).

The top level components are composed out of sub level domains, model, pics, undo, pages.

There are other components present in the project like `shared/app/i18n`
for internationalization or `shared/app/router` for routing
that I didn't use in this particular project yet, but I concider 
very important to have from the start of the project. 
They are present because I started this project from other project of mine 
[Fancy Hello World](https://github.com/gacosta89/fancy-helloworld)
that abstracts me from the problem of wireing.

There's a lot more of tooling for building, like yarn, webpack, eslint
that support development. But I prefered to focus this README and project 
on business value, productivity, and rationales I enumerated before.

If you want to now more in detail of the wireing please feel free to
contact me.

