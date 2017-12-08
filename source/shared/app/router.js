import React from 'react';

import { Router, Route } from 'react-router';

import Index from 'shared/pages/index';
import EditorPage from 'shared/pages/editor';

export default history => () =>
    <Router history={ history }>
      <Route path="/" component={ Index } >
        <Route path="*" component={ EditorPage } />
      </Route>
    </Router>;
