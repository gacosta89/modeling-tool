import { EMPTY_NODE } from 'shared/model/constants';

import { fixAbsCoordinates } from 'shared/model/utils';

/*
Description: createNode (handler / reducer)

Rationale: Is where the magic happens, meaning compute the next state of the app
  from the previous state and user action.

  In this case when the user dispaches a TAP_NODE action, and the selected tool is BOX_TYPE
  the createNode handler will take care of appending the new node with its dimentions
  to the nodes list of the tree state.

  They are pure functions, so easily testeable.
 */

export const createNode = (state, {
    payload: {
        id,
        parentId,
        absX = 20,
        absY = 20,
    }
}) => ({
    ...state,
    activeNodeId: id,
    selectionActive: true,
    nodes: {    // creates the nested structure as flat with parenId and childrenIds
        ...state.nodes,
        [id]: {
            ...EMPTY_NODE,
            id,
            parentId,
            absX: absX,
            absY: absY,
        },
        [parentId]: {
            ...state.nodes[parentId],
            childrenIds: [...state.nodes[parentId].childrenIds, id],
        },
    },
});

export const selectTool = (state, { payload: { parentId }}) =>
    ({ ...state, activeNodeId: parentId });

export const deleteNode = (state, { payload: { parentId: nodeId }}) => {
    if (nodeId === 'root') {
        return state;
    }
    const parentId = state.nodes[nodeId].parentId;
    const { [nodeId]: remove, ...nodes } = state.nodes; // eslint-disable-line no-unused-vars

    return {
        ...state,
        nodes: {
            ...nodes,
            [parentId]: {
                ...nodes[parentId],
                childrenIds: nodes[parentId].childrenIds.filter(id => id !== nodeId),
            },
        },
    };
};

export const activateNodeAndSelection = (state, { payload: { parentId }}) => ({
    ...state,
    selectionActive: true,
    activeNodeId: parentId,
});

export const activateAndSetIniAbs = (state, action) => ({
    ...activateNodeAndSelection(state, action),
    iniTap: { absX: action.payload.absX, absY: action.payload.absY },
});

export const drawNewNode = (state, { payload: { width, height }}) => {
    const activeNode = state.nodes[state.activeNodeId];
    const parentNode = state.nodes[activeNode.parentId];
    const delta = state.boxTypes[parentNode.type].style.borderWidth;
    return {
        ...state,
        selectionActive: false,
        nodes: {
            ...state.nodes,
            [state.activeNodeId]: {
                ...state.nodes[state.activeNodeId],
                relX: activeNode.absX - parentNode.absX - delta,
                relY: activeNode.absY - parentNode.absY - delta,
                width,
                height,
                show: true,
            },
        },
    };
};

export const resizeNode = (state, { payload: { width, height }}) => ({
    ...state,
    selectionActive: false,
    nodes: {
        ...state.nodes,
        [state.activeNodeId]: {
            ...state.nodes[state.activeNodeId],
            width,
            height,
        }
    }
});

export const moveNode = (state, { payload: { deltaX, deltaY }}) => {
    const activeNode = state.nodes[state.activeNodeId];
    const parentNode = state.nodes[activeNode.parentId];
    const borderWidth = state.boxTypes[parentNode.type].style.borderWidth;
    return {
        ...state,
        selectionActive: false,
        iniTap: {
            absX: 0,
            absY: 0
        },
        nodes: fixAbsCoordinates([state.activeNodeId], deltaX, deltaY, { // recursively fix abs coorinates for all childrens (family) when translating a node
            ...state.nodes,
            [state.activeNodeId]: {
                ...state.nodes[state.activeNodeId],
                relX: activeNode.absX + deltaX - parentNode.absX - borderWidth,
                relY: activeNode.absY + deltaY - parentNode.absY - borderWidth,
            },
        }),
    };
};

export const setRootRelHandler = (state, { payload: { absX, absY }}) => ({
    ...state,
    nodes: {
        ...state.nodes,
        root: {
            ...state.nodes.root,
            absX,
            absY
        },
    },
});

export const setBackgroundPicHandler = (state, { payload: { src }}) => ({
    ...state,
    nodes: {
        ...state.nodes,
        [state.activeNodeId]: {
            ...state.nodes[state.activeNodeId],
            backgroundImgSrc: src,
        },
    },
});

export const setToolHandler = (state, { payload: { tool: activeTool }}) => ({
    ...state,
    activeTool,
});

