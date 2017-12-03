import React from 'react';
import { translate } from 'react-i18next';

const HomePage = ({ t }) => <div>{ t('common:hi') }</div>;

HomePage.defaultProps = {
    t: x => x,
};

export { HomePage };

export default translate(['common'])(HomePage);
