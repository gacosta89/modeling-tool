import { EMPTY_NODE } from 'shared/model/constants';

import {
    fixAbsCoordinates,
    removeChildrensAndParent } from 'shared/model/utils';

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
            level: state.nodes[parentId].level + 1,
        },
        [parentId]: {
            ...state.nodes[parentId],
            childrenIds: [...state.nodes[parentId].childrenIds, id],
        },
    },
});

export const selectNode = (state, { payload: { parentId }}) =>
    ({ ...state, activeNodeId: parentId });


export const deleteNode = (state, { payload: { parentId: nodeId }}) => {
    if (nodeId === 'root') {
        return state;
    }
    const parentId = state.nodes[nodeId].parentId;

    return {
        ...state,
        activeNodeId: '',
        nodes: {
            ...removeChildrensAndParent(state.nodes, nodeId),
            [parentId]: {
                ...state.nodes[parentId],
                childrenIds: state.nodes[parentId].childrenIds.filter(id => id !== nodeId),
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

export const setBackgroundPicHandler = (state, { payload: { id }}) => ({
    ...state,
    nodes: {
        ...state.nodes,
        [state.activeNodeId]: {
            ...state.nodes[state.activeNodeId],
            backgroundImgId: id,
        },
    },
});

export const setToolHandler = (state, { payload: { tool: activeTool }}) => ({
    ...state,
    activeTool,
});

export const setNodeField = (state, { payload: { field, value }}) => ({
    ...state,
    nodes: {
        ...state.nodes,
        [state.activeNodeId]: {
            ...state.nodes[state.activeNodeId],
            [field]: value,
        },
    },
});

export const eraseHandler = iniState => state => ({
    ...iniState,
    nodes: {
        root: {
            ...iniState.nodes.root,
            absX: state.nodes.root.absX,
            absY: state.nodes.root.absY,
        },
    },
});

export const toggleHover = (state, {
    payload: {
        parentId: nodeId,
        enter,
        leave = false
}}) => ({
    ...state,
    hoveredNodeId: leave ? (state.hoveredNodeId === nodeId ? '' : nodeId) :
        (enter ? nodeId : state.nodes[nodeId].parentId),
});
