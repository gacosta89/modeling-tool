import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';

import configureProvider from 'shared/app/provider';
import i18n from 'shared/app/i18n';

export default React => (renderProps, store) => {
    const Provider = configureProvider(store, i18n);
    return renderToString(
        <Provider store={store}>
            <RouterContext { ...renderProps } />
        </Provider>
    );
};
