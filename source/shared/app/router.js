import React from 'react';

import { Router, Route } from 'react-router';

import EditorPage from 'shared/pages/editor';

export default history => () =>
    <Router history={ history }>
        <Route path="*" component={ EditorPage } />
    </Router>;
