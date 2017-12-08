import {
    EDITOR_MODE,
    MIRROR_MODE,
    INTERACTIVE_MODE,
    INTERACTIVE_PATH,
    MIRROR_PATH,
    EDITOR_PATH } from 'shared/app/constants';

const map = {
    [INTERACTIVE_PATH]: INTERACTIVE_MODE,
    [MIRROR_PATH]: MIRROR_MODE,
    [EDITOR_PATH]: EDITOR_MODE,
};

const getPathName = state =>
      state.routing.locationBeforeTransitions &&
      state.routing.locationBeforeTransitions.pathname || '';

export const getAppMode = state =>
    state.config.mode || (map.hasOwnProperty(getPathName(state)) ?
                          map[getPathName(state)] : EDITOR_MODE);

export const getIsInteractiveMode = state =>
    getAppMode(state) === INTERACTIVE_MODE;

export const getPersisted = state =>
    state.config.mode === INTERACTIVE_MODE;
