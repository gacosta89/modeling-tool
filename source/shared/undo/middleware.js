import {
    getStorage,
    putStorage,
    removeStorage } from 'shared/app/utils';

import {
    historyReducer,
    UNDO,
    REDO,
    ERASE,
    redo,
    commit,
    isUndoAction,
    isPost } from 'shared/undo/reducer';

import { getCurrentState } from 'shared/undo/selectors';

const undoMiddleware = store => {
    const iniState = getStorage('history');
    let undoState = historyReducer(iniState, { type: '@@INIT' });
    store.dispatch(redo({ nextState: getCurrentState(undoState) }));

    return next => action => {
        if ([UNDO, REDO].includes(action.type)) {
            undoState = historyReducer(undoState, action);
            putStorage('history', undoState);

            return next({
                ...action,
                payload: {
                    nextState: getCurrentState(undoState)
                }
            });
        } else if (isUndoAction(action)) {
            const prevState = store.getState();
            const nextAction = next(action);
            const nextState = store.getState();

            undoState = historyReducer(undoState, commit({
                prevState,
                nextState,
                isPost: isPost(action),
            }));

            putStorage('history', undoState);
            return nextAction;
        } else if (action.type === ERASE) {
            undoState = historyReducer(undoState, action);
            removeStorage('history', undoState);
        }

        return next(action);
    };
};

export default undoMiddleware;
