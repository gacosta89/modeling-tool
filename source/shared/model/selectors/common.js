import { createSelector } from 'reselect';

export const getSelectionActive = state =>
    state.model.selectionActive;

export const getActiveNodeCoords = createSelector(
    state => state.model.nodes[state.model.activeNodeId],
    node => ({ absX: node.absX, absY: node.absY }),
);

export const getNode = (state, id) => state.model.nodes[id];
export const getChildrens = (state, id) => state.model.nodes[id].childrenIds;

export const getBoxStyle = createSelector(
    getNode,
    state => state.model.boxTypes,
    (node, types) => types[node.type].style,
);

export const getActiveBoxStyle = state => getBoxStyle(state, state.model.activeNodeId);
