import { createSelector } from 'reselect';

import { getFirstChilds } from 'shared/model/utils';

import { EMPTY_NODE } from 'shared/model/constants';
import { INTERACTIVE_MODE } from 'shared/app/constants';

import { getAppMode } from 'shared/app/selectors';

export const getNode = (state, id) => state.model.nodes[id] || EMPTY_NODE;

export const getActiveNodeId = state =>
    state.model.activeNodeId;

export const getHoveredNodeId = state =>
    state.model.hoveredNodeId;

export const getActiveNode = state =>
    getNode(state, getActiveNodeId(state));

export const getHoveredNode = state =>
    getNode(state, getHoveredNodeId(state));

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

export const getPreview = state =>
    getAppMode(state) === INTERACTIVE_MODE ?
    true : state.model.preview;

export const getNodeForDescription = state => {
    const hovered = getHoveredNode(state);
    if (getPreview(state) && hovered !== EMPTY_NODE) {
        return hovered;
    } else {
        return getActiveNode(state);
    }
};

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


export const getUtilizedPicIds = createSelector(
    state => state.model.nodes,
    nodes => Object.values(nodes)
        .filter(node => node.backgroundImgId)
        .map(node => node.backgroundImgId)
);
