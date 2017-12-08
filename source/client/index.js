import 'normalize.css/normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';

import i18n from 'shared/app/i18n';
import App from 'shared/app/main';

import rootReducer from 'shared/app/reducer';
import rootSaga from 'shared/app/sagas';

import undoMiddleware from 'shared/undo/middleware';

const iniState = window.BOOTSTRAP_CLIENT_STATE || undefined;

const sagaMiddleware = createSagaMiddleware(); // saga middleware for side-effects
const routerMW = routerMiddleware(hashHistory); // sync browserHistory with router state

if (process.env.NODE_ENV === 'production') { // production mode: without hot reloading
    const store = createStore( // create the store with reducers
        rootReducer,
        iniState,
        applyMiddleware(routerMW, sagaMiddleware, undoMiddleware(['model']))
    );
    sagaMiddleware.run(rootSaga); // run sagas for IO
    const history = syncHistoryWithStore(hashHistory, store);

    ReactDOM.render( // mount the view layer
        <App history={history} store={store} i18n={i18n}/>,
        document.getElementById('root')
    );
} else { // dev mode with hot reloading reducers and components
    const { AppContainer } = require('react-hot-loader');
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
    const store = createStore(
        rootReducer,
        iniState,
        composeEnhancers(applyMiddleware(routerMW, sagaMiddleware, undoMiddleware(['model'])))
    );
    sagaMiddleware.run(rootSaga);
    const history = syncHistoryWithStore(hashHistory, store);

    ReactDOM.render(
        <AppContainer>
            <App history={ history } store={ store } i18n={i18n} />
        </AppContainer>,
        document.getElementById('root')
    );

    module.hot.accept('shared/app/reducer', () => { // configuration for hot reloading in dev mode
        store.replaceReducer(require('shared/app/reducer'));
    });

    module.hot.accept('shared/app/main', () => {
        const NextApp = require('shared/app/main').default;

        ReactDOM.render(
            <AppContainer>
                <NextApp history={ history } store={ store } i18n={i18n}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}


