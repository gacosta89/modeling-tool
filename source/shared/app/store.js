import { createStore } from 'redux';

const id = x => x;

export default (reducer, iniState, enhancers = id) =>
    createStore(reducer, iniState, enhancers);
