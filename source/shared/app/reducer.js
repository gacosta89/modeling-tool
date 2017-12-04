import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import modelReducer from 'shared/model/reducer';

/*
Description: combineReducers (redux) utility.

Rationale: compose reducers from different domains to create the rootReducer
  and root tree state.

  The output is a root reducer pure function that will be used by the store.
*/

export default combineReducers({
    routing: routerReducer,
    model: modelReducer,
});
