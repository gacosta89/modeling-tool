import React from 'react';

import { Router, Route, IndexRedirect } from 'react-router';

import Index from 'shared/pages/index';
import HomePage from 'shared/pages/home';
import EditorPage from 'shared/pages/editor';

export default history => () =>
    <Router history={ history }>
      <Route path={'/'} component={ Index } >
        <IndexRedirect to={'/home'} />
        <Route path={'/home'} component={ HomePage } />
        <Route path={'/editor'} component={ EditorPage } />
      </Route>
    </Router>;
