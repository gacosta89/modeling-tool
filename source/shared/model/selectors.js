import { createSelector } from 'reselect';

import { EMPTY_NODE } from 'shared/model/constants';

export const getSelectionActive = state =>
    state.model.activeNodeId !== EMPTY_NODE.id;

export const getActiveNodeCoords = createSelector(
    state => state.model.nodes[state.model.activeNodeId],
    node => ({ absX: node.absX, absY: node.absY }),
);

export const getNode = (state, id) => state.model.nodes[id];
export const getChildrens = (state, id) => state.model.nodes[id].childrenIds;
