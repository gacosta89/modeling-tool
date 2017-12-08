import webpack from 'webpack';
import devConfig from './webpack.config.dev.js';
import config from 'config';
import WebpackDevServer from 'webpack-dev-server';

import renderLayout from 'server/render/layout';

const compiler = webpack(devConfig);
const NODE_PORT = process.env.NODE_PORT || 3000;
const NODE_HOST = 'localhost';

const notStaticPath = /^(?!.*\/static).*$/;

const server = new WebpackDevServer(compiler, {
    stats: {
        colors: true,
    },
    hot: true,
    contentBase: config.get('folders.client.static'),
    publicPath: '/static/',
    port: NODE_PORT,
    setup (app) {
        app.use(notStaticPath, (req, res) => {
            res.status(200).send(
                renderLayout({
                    title: config.get('name'),
                    rootMarkup: '',
                }));
        });
    }
});


server.listen(NODE_PORT, NODE_HOST, (err) => err ?
           console.error(err) :
           console.log(`Listening at http://${NODE_HOST}:${NODE_PORT}`));
