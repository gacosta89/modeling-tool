import React from 'react';

import configureRouter from 'shared/app/router';
import configureProvider from 'shared/app/provider';

const App = ({ history, store, i18n }) => {
  const Router = configureRouter(history);
  const Provider = configureProvider(store, i18n);
  return (
    <Provider>
        <Router/>
    </Provider>
  );
};

export default App;
