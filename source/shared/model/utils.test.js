import test from 'tape';
import { getFamily, getFirstChilds } from './utils.js';

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

test('getFirstChilds', nest => {
    nest.test('with children', assert => {
        assert.plan(1);

        const nodes = {
            'p': {
                childrenIds: ['h1', 'h2'],
            },
            'h2': {
                childrenIds: ['h2h1', 'h2h2'],
            },
            'h1': {
                childrenIds: ['h1h1', 'h1h2'],
            },
            'h1h1h1': {
                childrenIds: [],
            },
            'h1h1': {
                childrenIds: ['h1h1h1'],
            },
            'h2h1': {
                childrenIds: [],
            },
            'h1h2': {
                childrenIds: [],
            },
            'h2h2': {
                childrenIds: [],
            },
        };

        const expected = ['h1', 'h1h1', 'h1h1h1', 'h1h2', 'h2', 'h2h1', 'h2h2'];

        const actual = getFirstChilds(nodes, [], 'h1', 'h2');
        assert.deepEqual(actual, expected, 'It should return the flat array of children ids ordered by level.');
    });

    nest.test('without children', assert => {
        assert.plan(1);

        const nodes = {
            'p': {
                childrenIds: [],
            },
        };

        const expected = [];

        const actual = getFirstChilds(nodes, [], ...[]);
        assert.deepEqual(actual, expected, 'It should return the empty array.');
    });
});
