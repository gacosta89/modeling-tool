import makeApp from 'server/app.js';
import config from 'config';

const host = config.get('host');
const port = config.get('port');

const app = makeApp();

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Listening at http://${ host }:${ port }`);
});
