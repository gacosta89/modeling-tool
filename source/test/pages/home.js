import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import { HomePage } from 'shared/pages/home';

test('HomePage', assert => {
    assert.plan(1);
    const wrapper = shallow(<HomePage />);

    assert.equal(wrapper.contains(<div>common:hi</div>),
                 true, 'It should contain a div with hello world key from common');
});
