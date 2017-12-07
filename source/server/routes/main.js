import config from 'config';

import renderLayout from 'server/render/layout';

export default (req, res) => {
    res.status(200).send(
        renderLayout({
            title: config.get('name'),
            rootMarkup: '',
            initialState: {}
        }));
};
