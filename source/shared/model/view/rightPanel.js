import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { activateNode, toggleHoverNode, togglePreview } from 'shared/model/reducer';
import {
    getPreview,
    getNodeIdsByLevel,
    getNodeName,
    getNodeLevel,
    getColor } from 'shared/model/selectors';

import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const RightPanel = styled(Paper)`
    width: 300px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    flex: 1;
`;

const ToolBar = styled.div`
    display: flex;
    padding-bottom: 10px;
    justifyContent: flex-end;
`;

const ToolBarContainer = ({ onErase }) =>
    <ToolBar>
        <Button
            raised
            onClick={onErase}
        >
            SLAVE
        </Button>
        <Button
            raised
            onClick={onErase}
        >
            GENERATE
        </Button>
    </ToolBar>;

const getPadding = level => `${(level - 1) * 5}px`;

const NodeBoxContainer = styled.div`
    margin-left: ${props => getPadding(props.level)}
    margin-top: 1px;
    margin-bottom: 1px;
    display: flex;
    align-items: stretch;
    padding: 5px;
    border: solid 1px ${props => props.color};
    color: ${props => props.color};
    min-height: 18px;
    &:before {
        content: "";
        display: inline-block;
        height: 18;
        width: 10px;
        margin-right: 5px;
        background-color: ${props => props.color}
    }
`;

const NodeBox = connect(
    (state, ownProps) => ({
        nodeName: getNodeName(state, ownProps.id),
        nodeLevel: getNodeLevel(state, ownProps.id),
        color: getColor(state, ownProps.id),
    }),
    (dispatch, ownProps) => ({
        onClick: () => dispatch(activateNode({ parentId: ownProps.id })),
        onEnter: () => dispatch(toggleHoverNode({ parentId: ownProps.id, leave: true })),
        onLeave: () => dispatch(toggleHoverNode({ parentId: ownProps.id, leave: true })),
    })
)(
    ({ nodeName, nodeLevel, color, onClick, onEnter, onLeave }) =>
        <NodeBoxContainer
            level={nodeLevel}
            color={color}
            onClick={onClick}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {nodeName}
        </NodeBoxContainer>
);

const RightPanelContainer = ({ nodes, preview, onToggle }) =>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ToolBarContainer />
        <RightPanel>
            <FormControlLabel
                control={<Switch checked={preview} />}
                label="Preview" onChange={onToggle}
            />
            {
                nodes.map(nodeId => <NodeBox key={nodeId} id={nodeId} />)
            }
        </RightPanel>
    </div>;

const mapStateToProps = state => ({
    nodes: getNodeIdsByLevel(state),
    preview: getPreview(state),
});

const mapDispatchToProps = dispatch => ({
    onToggle: () => dispatch(togglePreview())
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelContainer);
