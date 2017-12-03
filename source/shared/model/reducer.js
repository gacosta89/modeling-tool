import { createDuck } from 'redux-duck';

import { EMPTY_NODE, BOX_TYPE, ROOT_TYPE } from 'shared/model/constants';

const modelDuck = createDuck('model');


const iniState = {
    boxTypes: { // Flexibility of box types to create different components (screen, button, frames)
        [BOX_TYPE]: {
            type: BOX_TYPE,
            style: {
                borderWidth: 1,
            },
        },
        [ROOT_TYPE]: {
            type: ROOT_TYPE,
            style: {
                borderWidth: 0,
            },
        },
    },
    nodes: {
        root: {
            ...EMPTY_NODE,
            id: 'root',
            type: ROOT_TYPE,
        }
    },
    activeNodeId: EMPTY_NODE.id,
};


export const CREATE_NODE = modelDuck.defineType('create_node');
export const createNode = modelDuck.createAction(CREATE_NODE);

export const DRAW_NODE = modelDuck.defineType('draw_node');
export const drawNode = modelDuck.createAction(DRAW_NODE);

export const SET_ROOT_REL = modelDuck.defineType('set_root_rel');
export const setRootRel = modelDuck.createAction(SET_ROOT_REL);

const modelReducer = modelDuck.createReducer({
    [CREATE_NODE]: (state, {
        payload: {
            id,
            parentId,
            absX,
            absY,
        }
    }) => ({
        ...state,
        activeNodeId: id,
        nodes: {             // creates the nested structure as flat with parenId and childrenIds
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
    }),
    [DRAW_NODE]: (state, { payload: { width, height }}) => {
        const activeNode = state.nodes[state.activeNodeId];
        const parentNode = state.nodes[activeNode.parentId];
        const delta = state.boxTypes[parentNode.type].style.borderWidth;
        return {
            ...state,
            activeNodeId: EMPTY_NODE.id,
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
    },
    [SET_ROOT_REL]: (state, { payload: { absX, absY }}) => ({
        ...state,
        nodes: {
            ...state.nodes,
            root: {
                ...state.nodes.root,
                absX,
                absY
            },
        },
    }),
}, iniState);

export default modelReducer;
