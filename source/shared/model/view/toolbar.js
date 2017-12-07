import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setBackgroundPic } from 'shared/pics/reducer';
import { setTool } from 'shared/model/reducer';
import { undo, redo, erase } from 'shared/undo/reducer';

import Button from 'material-ui/Button';
import FileButton from 'shared/ui-kit/fileButton';

import {
    BOX_TOOL,
    DELETE_TOOL,
    SELECT_TOOL,
    RESIZE_TOOL,
    MOVE_TOOL } from 'shared/model/constants';

const ToolBar = styled.div`
    display: flex;
    padding-bottom: 10px;
    justifyContent: flex-start;
`;

const RightToolBar = styled.div`
    display: flex;
    flex: 1;
    justifyContent: flex-start;
`;

const LeftToolBar = styled.div`
    display: flex;
    justifyContent: flex-start;
`;

const ToolBarContainer = ({ onFiles, onSetTool, onUndo, onRedo, onErase }) =>
    <ToolBar>
        <RightToolBar>
            <Button
                raised
                onClick={onSetTool(BOX_TOOL)}
            >
                BOX
            </Button>
            <Button
                raised
                onClick={onSetTool(DELETE_TOOL)}
            >
                DELETE
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
            <Button
                raised
                onClick={onSetTool(SELECT_TOOL)}
            >
                SELECT
            </Button>
            <FileButton
                raised
                onFiles={onFiles}
            >
                PIC
            </FileButton>
            <Button
                raised
                onClick={onErase}
            >
                ERASE
            </Button>
        </RightToolBar>
        <LeftToolBar>
            <Button
                raised
                onClick={onUndo}
            >
                UNDO
            </Button>
            <Button
                raised
                onClick={onRedo}
            >
                REDO
            </Button>
        </LeftToolBar>
    </ToolBar>;

const mapDispatchToProps = dispatch => ({
    onFiles: e => dispatch(setBackgroundPic({ file: e.target.files[0] })),
    onSetTool: tool => () => dispatch(setTool({ tool })),
    onUndo: () => dispatch(undo()),
    onRedo: () => dispatch(redo()),
    onErase: () => dispatch(erase()),
});

export default connect(null, mapDispatchToProps)(ToolBarContainer);
