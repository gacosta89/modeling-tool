import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getNodeIds, getNodeName, getNodeLevel } from 'shared/model/selectors';

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
            INTERACTIVE
        </Button>
        <Button
            raised
            onClick={onErase}
        >
            GENERATE
        </Button>
    </ToolBar>;

const colors = ['red', 'green', 'blue', 'orange'];
const getColor = level => colors[level % 4];
const getPadding = level => `${(level - 1) * 5}px`;

const NodeBoxContainer = styled.div`
    margin-left: ${props => getPadding(props.level)}
    margin-top: 1px;
    margin-bottom: 1px;
    display: flex;
    align-items: stretch;
    padding: 5px;
    border: solid 1px ${props => getColor(props.level)};
    color: ${props => getColor(props.level)};
    min-height: 18px;
    &:before {
        content: "";
        display: inline-block;
        height: 18;
        width: 10px;
        margin-right: 5px;
        background-color: ${props => getColor(props.level)}
    }
`;

const NodeBox = connect(
    (state, ownProps) => ({
        nodeName: getNodeName(state, ownProps.id),
        nodeLevel: getNodeLevel(state, ownProps.id),
    })
)(
    ({ nodeName, nodeLevel }) =>
        <NodeBoxContainer level={nodeLevel}>
            {nodeName}
        </NodeBoxContainer>
);

const RightPanelContainer = ({ nodes }) =>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ToolBarContainer />
        <RightPanel>
            {
                nodes.map(nodeId => <NodeBox key={nodeId} id={nodeId} />)
            }
        </RightPanel>
    </div>;

const mapStateToProps = state => ({
    nodes: getNodeIds(state),
});

export default connect(mapStateToProps)(RightPanelContainer);
