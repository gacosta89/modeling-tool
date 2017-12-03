import React from 'react';

const headerItemStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1
};

const HeaderItem = React.createClass({
  render () {
    const {children, style} = this.props;
    return (
      <div style={[headerItemStyle, style]}>
        {children}
      </div>
    );
  }
});

export default HeaderItem;
