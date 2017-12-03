import React from 'react';
import styled from 'styled-components';

import Button from 'material-ui/Button';

const ToolBar = styled.div`
    display: flex;
    justifyContent: flex-start;
    position: absolute;
    z-index: 200;
`;

const ToolBarContainer = ({}) =>
    <ToolBar>
        <Button
            raised
        >
            BOX
        </Button>
        <Button
            raised
        >
      PIC
        </Button>
    </ToolBar>;

export default ToolBarContainer;
