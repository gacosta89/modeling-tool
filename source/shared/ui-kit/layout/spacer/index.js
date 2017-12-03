import React from 'react';

const spacerStyle = {
  background: 'transparent'
};

const Spacer = ({style}) => <div style={{...spacerStyle, ...style}}></div>;

export default Spacer;
