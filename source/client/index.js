import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import i18n from 'shared/app/i18n';
import App from 'shared/app/main';

import rootReducer from 'shared/app/reducer';

import 'normalize.css/normalize.css';

const iniState = window.BOOTSTRAP_CLIENT_STATE;

if (process.env.NODE_ENV === 'production') {
    const store = createStore(rootReducer, iniState);
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render(
        <App history={history} store={store} i18n={i18n}/>,
        document.getElementById('root')
    );
} else {
    const { AppContainer } = require('react-hot-loader');
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
    );
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render(
        <AppContainer>
            <App history={ history } store={ store } i18n={i18n} />
        </AppContainer>,
        document.getElementById('root')
    );

    module.hot.accept('shared/app/reducer', () => {
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
