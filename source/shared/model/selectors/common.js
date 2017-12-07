import { createSelector } from 'reselect';

import { getFirstChilds } from 'shared/model/utils';

import { EMPTY_NODE } from 'shared/model/constants';

export const getNode = (state, id) => state.model.nodes[id] || EMPTY_NODE;

export const getActiveNodeId = state =>
    state.model.activeNodeId;

export const getHoveredNodeId = state =>
    state.model.hoveredNodeId;

export const getActiveNode = state =>
    getNode(state, getActiveNodeId(state));

export const getSelectionActive = state =>
    state.model.selectionActive;

export const getActiveTool = state => state.model.activeTool;

export const getActiveNodeCoords = createSelector(
    getActiveNode,
    node => ({
        absX: node.absX,
        absY: node.absY,
        relX: node.relX,
        relY: node.relY
    }),
);

export const getChildrens = (state, id) =>
    getNode(state, id).childrenIds;

export const getIniTap = state => state.model.iniTap;

export const getActiveNodeField = (state, field) =>
    getActiveNode(state)[field] || '';

export const getNodeIds = createSelector(
    state => state.model.nodes,
    nodes => Object.keys(nodes).slice(1),
);

export const getNodeIdsByLevel = createSelector(
    state => state.model.nodes,
    nodes => getFirstChilds(nodes, [], ...nodes.root.childrenIds),
);

const getNodeField = field => (state, id) =>
      getNode(state, id)[field];

export const getNodeName = getNodeField('name');
export const getNodeLevel = getNodeField('level');
