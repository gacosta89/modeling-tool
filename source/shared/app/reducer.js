import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import undoReducerFactory from 'shared/undo/reducer';

import modelReducer from 'shared/model/reducer';
import picsReducer from 'shared/pics/reducer';

/*
Description: combineReducers (redux) utility.

Rationale: compose reducers from different domains to create the rootReducer
  and root tree state.

  The output is a root reducer pure function that will be used by the store.
*/

export default undoReducerFactory(combineReducers({
    routing: routerReducer,
    model: modelReducer,
    pics: picsReducer,
}));
