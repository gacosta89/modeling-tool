import request from 'supertest';
import test from 'tape';
import makeApp from 'server/app.js';

const app = makeApp();

export default ({ route, message }) => {
    test(`GET ${ route }`, nest => {
        nest.test(route, assert => {
            assert.plan(1);
            const msg = message || `${ route } should not return an error`;
            const expected = null;

            request(app)
                .get(route)
                .expect(200)
                .end(actual => {
                    assert.equal(actual, expected, msg);
                });
        });
    });
};
