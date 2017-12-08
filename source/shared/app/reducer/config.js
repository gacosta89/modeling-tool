import { createDuck } from 'redux-duck';

const namespace = createDuck('config');

export const SET_MODE = namespace.defineType('SET_MODE');
export const setMode = namespace.createAction(SET_MODE);

const iniState = {
    mode: '',
};

const configReducer = namespace.createReducer({
    [SET_MODE]: (state, { payload: { mode }}) => ({
        mode,
    }),
}, iniState);

export default configReducer;
