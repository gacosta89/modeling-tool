import test from 'tape';
import { getFamily } from './utils.js';

test('getFamily', assert => {
    assert.plan(1);

    const nodes = {
        '01': {
            childrenIds: ['02', '03'],
        },
        '02': {
            childrenIds: ['04'],
        },
        '03': {
            childrenIds: [],
        },
        '04': {
            childrenIds: [],
        },
        '10': {
            childrenIds: [],
        },
        '11': {
            childrenIds: [],
        },
    };

    const expected = ['01', '02', '03', '04'];

    const actual = getFamily(nodes, ['01'], ['01']);

    assert.deepEqual(actual, expected, 'It should return the flat array of children ids.');
});
