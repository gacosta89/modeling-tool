import { createDuck } from 'redux-duck';
import { decorateUndoPre, decorateUndoPost } from 'shared/undo/reducer';
import { SET_BACKGROUND_PIC_SRC } from 'shared/pics/reducer';

import {
    EMPTY_NODE,
    BOX_TOOL,
    SELECT_TOOL,
    RESIZE_TOOL,
    MOVE_TOOL,
    DELETE_TOOL,
    DEFAULT_TYPE_OBJ,
    BACKGROUND_TYPE,
    BOX_TYPE,
    ROOT_TYPE } from 'shared/model/constants';

import {
    selectNode,
    createNode,
    deleteNode,
    activateNodeAndSelection,
    activateAndSetIniAbs,
    drawNewNode,
    resizeNode,
    moveNode,
    setNodeField,
    setRootRelHandler,
    setBackgroundPicHandler,
    setToolHandler,
    eraseHandler } from 'shared/model/reducer/handlers';

import { ERASE } from 'shared/undo/reducer';

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
                overflow: 'hidden',
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
            level: 0,
        }
    },
    activeNodeId: 'root',
    selectionActive: false,
    activeTool: BOX_TOOL,
    iniTap: {
        absX: 0,
        absY: 0,
    },
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
export const tapNode = decorateUndoPre(namespace.createAction(TAP_NODE));

export const DRAW_NODE = namespace.defineType('draw_node');
export const drawNode = decorateUndoPost(namespace.createAction(DRAW_NODE));

export const SET_ROOT_REL = namespace.defineType('set_root_rel');
export const setRootRel = namespace.createAction(SET_ROOT_REL);

export const SET_TOOL = namespace.defineType('set_tool');
export const setTool = namespace.createAction(SET_TOOL);

export const SET_FIELD = namespace.defineType('set_field');
export const setField = namespace.createAction(SET_FIELD);

/*
Description: toolMAP "smart" reducer structure.

The renderingArea component (/shared/model/view/renderingArea) dispatches TAP_NODE actions
The drawingArea component (/shared/model/view/drawingArea) dispatches DRAW_NODE actions

My idea with this structure is to make different things with the boxes when different tools are selected.

So the structure is the following:

toolMap = {
    [ACTION_TYPE]: {
         [TOOL_TYPE]: handler(...)
    }
}

E.g.: when the user taps a node with the SELECT_TOOL active. The action type will be TAP_NODE,
and the activeTool will be SELECT_TOOL, so the handler of the line 148 will be called.
This selection of handler is done by the selectReducer util function (line 160) and used in lines 186 and 187

*/

const toolMAP = {
    [TAP_NODE]: {
        [SELECT_TOOL]: selectNode,
        [BOX_TOOL]: createNode,
        [RESIZE_TOOL]: activateNodeAndSelection,
        [MOVE_TOOL]: activateAndSetIniAbs,
        [DELETE_TOOL]: deleteNode,
    },
    [DRAW_NODE]: {
        [BOX_TOOL]: drawNewNode,
        [RESIZE_TOOL]: resizeNode,
        [MOVE_TOOL]: moveNode,
    }
};

const selectReducer = handlers => (state, action) =>
      handlers.hasOwnProperty(state.activeTool) ?
      handlers[state.activeTool](state, action) : state;

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
    [TAP_NODE]: selectReducer(toolMAP[TAP_NODE]),
    [DRAW_NODE]: selectReducer(toolMAP[DRAW_NODE]),
    [SET_ROOT_REL]: setRootRelHandler,
    [SET_BACKGROUND_PIC_SRC]: setBackgroundPicHandler,
    [SET_TOOL]: setToolHandler,
    [SET_FIELD]: setNodeField,
    [ERASE]: eraseHandler(iniState),
}, iniState);

export default modelReducer;
