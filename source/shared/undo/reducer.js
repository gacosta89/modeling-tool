import { createDuck } from 'redux-duck';

const namespace = createDuck('undo');


export const UNDOREDO = namespace.defineType('UNDOREDO');

export const UNDO = namespace.defineType('UNDO');
export const undo = namespace.createAction(UNDO);

export const REDO = namespace.defineType('REDO');
export const redo = namespace.createAction(REDO);

export const COMMIT = namespace.defineType('COMMIT');
export const commit = namespace.createAction(COMMIT);

export const ERASE = namespace.defineType('ERASE');
export const erase = namespace.createAction(ERASE);

export const decorateUndoPre = actionCreator => payload => ({
    ...actionCreator(payload),
    [UNDOREDO]: 'previous',
});

export const decorateUndoPost = actionCreator => payload => ({
    ...actionCreator(payload),
    [UNDOREDO]: 'post',
});

export const isUndoAction = action => action.hasOwnProperty(UNDOREDO);
export const isPost = action => action.hasOwnProperty(UNDOREDO) &&
    action[UNDOREDO] === 'post';

export const isPre = action => action.hasOwnProperty(UNDOREDO) &&
    action[UNDOREDO] === 'previous';

export const iniState = {
    history: [],
    currentIndex: 0,
};

export const historyReducer = namespace.createReducer({
    [UNDO]: state => ({
        ...state,
        currentIndex: state.currentIndex > 0 ?
            state.currentIndex - 1 :
            state.currentIndex,
    }),
    [REDO]: state => ({
        ...state,
        currentIndex: state.currentIndex < state.history.length - 1 ?
            state.currentIndex + 1 :
            state.currentIndex,
    }),
    [ERASE]: () => iniState,
    [COMMIT]: (state, { payload: { isPost, prevState, nextState }}) => { // eslint-disable-line
        return {
            ...state,
            history: state.history.slice(0, state.currentIndex + 1).concat(
                isPost ? nextState : state.history.length === 0 ? prevState : [],
            ),
            currentIndex: state.history.length,
        };
    },
}, iniState);

const undoReducerFactory = nextReducer =>
    (state, action) => {
        const { type } = action;

        if ([UNDO, REDO].includes(type)) {
            const { payload: { nextState }} = action;
            if (nextState) {
                return {
                    ...state,
                    ...nextState,
                };
            }

            return state;
        } else {
            return nextReducer(state, action);
        }
    };

export default undoReducerFactory;
