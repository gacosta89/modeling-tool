import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setBackgroundPic, setTool } from 'shared/model/reducer';

import Button from 'material-ui/Button';
import FileButton from 'shared/ui-kit/fileButton';

import {
    BOX_TOOL,
    SELECT_TOOL,
    RESIZE_TOOL,
    MOVE_TOOL } from 'shared/model/constants';

const ToolBar = styled.div`
    display: flex;
    padding-bottom: 10px;
    justifyContent: flex-start;
`;

const ToolBarContainer = ({ onFiles, onSetTool }) =>
    <ToolBar>
        <Button
            raised
            onClick={onSetTool(BOX_TOOL)}
        >
            BOX
        </Button>
        <Button
            raised
            onClick={onSetTool(SELECT_TOOL)}
        >
            SELECT
        </Button>
        <Button
            raised
            onClick={onSetTool(RESIZE_TOOL)}
        >
            RESIZE
        </Button>
        <Button
            raised
            onClick={onSetTool(MOVE_TOOL)}
        >
            MOVE
        </Button>
        <FileButton
            raised
            onFiles={onFiles}
        >
            PIC
        </FileButton>
    </ToolBar>;

const mapDispatchToProps = dispatch => ({
    onFiles: e => dispatch(setBackgroundPic({ file: e.target.files[0] })),
    onSetTool: tool => () => dispatch(setTool({ tool })),
});

export default connect(null, mapDispatchToProps)(ToolBarContainer);
