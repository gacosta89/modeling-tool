import React, { PropTypes, Children } from 'react';

const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

const configureProvider = (store, i18n) => {
  const Provider = React.createClass({
    getChildContext () {
      return { store, i18n };
    },
    render () {
      return Children.only(this.props.children);
    },
    propTypes: {
      children: PropTypes.element.isRequired
    },
    childContextTypes: {
      store: storeShape.isRequired,
      i18n: PropTypes.object.isRequired
    }
  });

  return Provider;
};

export default configureProvider;
