import { createDuck } from 'redux-duck';

import {
    EMPTY_NODE,
    BOX_TOOL,
    SELECT_TOOL,
    DEFAULT_TYPE_OBJ,
    BACKGROUND_TYPE,
    BOX_TYPE,
    ROOT_TYPE } from 'shared/model/constants';

/*
Description: namespace (redux-duck) utility.

Rationale: it allows to create namespaces for reducers and actions, as javascript is not static typed
  we need to duck type actions to later define the right hanlder for each action type in the reducer.
 */

const namespace = createDuck('model');

/*
Description: iniState (redux redux-duck).

Rationale: defines the initial state when the app is initialized.
  Also how the shape of the tree state (data model) that then will be updated by reducers.
 */

const iniState = {
    boxTypes: { // Flexibility of box types to create different components (screen, button, frames)
        [BOX_TYPE]: {
            ...DEFAULT_TYPE_OBJ,
            type: BOX_TYPE,
            style: {
                borderWidth: 1,
            },
        },
        [ROOT_TYPE]: {
            ...DEFAULT_TYPE_OBJ,
            type: ROOT_TYPE,
            style: {
                borderWidth: 0,
                border: 'none',
                flex: 1,
                position: 'relative',
            },
        },
        [BACKGROUND_TYPE]: {
            ...DEFAULT_TYPE_OBJ,
            type: BACKGROUND_TYPE,
            style: {
                borderWidth: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: 500,
                height: 500,
            },
        }
    },
    nodes: {
        root: {
            ...EMPTY_NODE,
            id: 'root',
            type: ROOT_TYPE,
            show: true,
        }
    },
    activeNodeId: EMPTY_NODE.id,
    selectionActive: false,
    activeTool: BOX_TOOL,
};

/*
Description: tapNode (redux redux-duck) action creator.

Rationale: actions are immutable messages that describe a user action/event/intent that
  will be handled by reducers later.

  Action creators ensure that the right action type is dispached, avoding duck typing typos.

  Actions can be dispached to the store by the store.dispatch method or dispatch from react-redux connect.

  They can be dispached from several parts of the application like react components, sagas (IO), middleware.

  Actions can be handled in every other reducer if needed. They are not a privilege of this reducer,
  as they convay an action/event/intent of the user.
*/

export const TAP_NODE = namespace.defineType('tap_node');
export const tapNode = namespace.createAction(TAP_NODE);

export const DRAW_NODE = namespace.defineType('draw_node');
export const drawNode = namespace.createAction(DRAW_NODE);

export const SET_ROOT_REL = namespace.defineType('set_root_rel');
export const setRootRel = namespace.createAction(SET_ROOT_REL);

export const SET_BACKGROUND_PIC = namespace.defineType('set_background_pic');
export const setBackgroundPic = namespace.createAction(SET_BACKGROUND_PIC);

export const SET_BACKGROUND_PIC_SRC = namespace.defineType('set_background_pic_src');
export const setBackgroundPicSrc = namespace.createAction(SET_BACKGROUND_PIC_SRC);

export const SET_TOOL = namespace.defineType('set_tool');
export const setTool = namespace.createAction(SET_TOOL);

/*
  Description: modelReducer (redux-duck and redux) This reducer handles the creation and dimentions of the nodes.

  Reducer: bussiness logic layer.

  Rationale: it works as a state machine. In general used for the bussiness logic and complex rendering
  logic, like this case.

  All they do is take the previous state, as first argument, an action (that is an immutable message describing
  what changed) as second argument, and they return the next state.

  It is a pure function so super easy to test.

  Reducers are pure functions, then easily composable.
  The redux store will take this reducer and call it to deal with its part of the state
  (state.model, see shared/app/reducer).

  redux-duck allow to compose a reducer out of action handlers (tiny reducers) that deal with each action type.
  The notation is { [ACTION_TYPE]: handlerFunction, ...}
*/

const modelReducer = namespace.createReducer({
    [TAP_NODE]: (state, {
        payload: {
            id,
            parentId,
            absX = 20,
            absY = 20,
        }
    }) => state.activeTool === SELECT_TOOL ? {
        ...state,
        activeNodeId: parentId,
    } : {
        ...state,
        activeNodeId: id,
        selectionActive: true,
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
    },
    [DRAW_NODE]: (state, { payload: { width, height }}) => {
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
    [SET_BACKGROUND_PIC_SRC]: (state, { payload: { src }}) => ({
        ...state,
        nodes: {
            ...state.nodes,
            [state.activeNodeId]: {
                ...state.nodes[state.activeNodeId],
                backgroundImgSrc: src,
            },
        },
    }),
    [SET_TOOL]: (state, { payload: { tool: activeTool }}) => ({
        ...state,
        activeTool,
    }),
}, iniState);

export default modelReducer;
