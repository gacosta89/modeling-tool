import React from 'react';
import config from 'config';

import {
    match
} from 'react-router';

import {
    createStore
} from 'redux';
import rootReducer from 'shared/app/reducer';

import renderLayout from 'server/render/layout';
import render from 'server/render';

import configureRouter from 'shared/app/router';

const store = createStore(rootReducer);
const routes = configureRouter()();
const initialState = store.getState();

const title = config.get('name');

export default (req, res) => {
    match({
        routes,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const rootMarkup = render(React)(renderProps, store);
            res.status(200).send(renderLayout({
                title,
                rootMarkup,
                initialState
            }));
        } else {
            res.status(404).send('Not found');
        }
    });
};
