import appHome from '../../app-home';

export default {
    ...appHome,
    APP_HOST: '0.0.0.0',
    APP_PORT: 3000,
    APP_NAME: 'React Boilerplate',
    NODE_HOST: '0.0.0.0',
    NODE_PORT: 3000,
    TITLE: 'Node Chat',
    LOG_PARAMS: false // use `/gif.log/:message` to track client logs.
};
