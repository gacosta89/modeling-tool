import { createSelector } from 'reselect';

export const getSelectionActive = state =>
    state.model.selectionActive;

export const getActiveNodeCoords = createSelector(
    state => state.model.nodes[state.model.activeNodeId],
    node => ({ absX: node.absX, absY: node.absY, relX: node.relX, relY: node.relY }),
);

export const getActiveTool = state => state.model.activeTool;

export const getNode = (state, id) => state.model.nodes[id];
export const getChildrens = (state, id) =>
    getNode(state, id) ? getNode(state, id).childrenIds : [];

export const getIniTap = state => state.model.iniTap;

export const getActiveNodeField = (state, field) =>
    getNode(state, state.model.activeNodeId) ?
    getNode(state, state.model.activeNodeId)[field] : '';

export const getNodeIds = createSelector(
    state => state.model.nodes,
    nodes => Object.keys(nodes).slice(1),
);

export const getNodeName = (state, id) =>
    getNode(state, id).name;

export const getNodeLevel = (state, id) =>
    getNode(state, id).level;
