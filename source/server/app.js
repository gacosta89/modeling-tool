import express from 'express';
import config from 'config';

import mainRoute from 'server/routes/main';

const makeApp = (app = express()) => {

    const staticDir = config.get('folders.client.static');
    console.info('assets folder:', staticDir);
    app.use('/static', express.static(staticDir));

    app.use('/', mainRoute);

    return app;
};

export default makeApp;
