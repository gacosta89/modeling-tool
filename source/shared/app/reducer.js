import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import modelReducer from 'shared/model/reducer';

export default combineReducers({
    routing: routerReducer,
    model: modelReducer,
});
