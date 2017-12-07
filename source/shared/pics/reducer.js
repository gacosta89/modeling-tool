import { createDuck } from 'redux-duck';
import { decorateUndoPost } from 'shared/undo/reducer';

const namespace = createDuck('pics');

export const SET_BACKGROUND_PIC = namespace.defineType('set_background_pic');
export const setBackgroundPic = namespace.createAction(SET_BACKGROUND_PIC);

export const SET_BACKGROUND_PIC_SRC = namespace.defineType('set_background_pic_src');
export const setBackgroundPicSrc = decorateUndoPost(namespace.createAction(SET_BACKGROUND_PIC_SRC));

export const SET_PICS = namespace.defineType('set_pics');
export const setPics = namespace.createAction(SET_PICS);

const iniState = {
    allPics: {},
};

const picsReducer = namespace.createReducer({
    [SET_BACKGROUND_PIC_SRC]: (state, { payload: { src, id }}) => ({
        ...state,
        allPics: {
            ...state.allPics,
            [id]: {
                id,
                src,
            }
        }
    }),
    [SET_PICS]: (state, { payload: { allPics }}) => ({
        ...state,
        allPics: allPics || {},
    }),
}, iniState);

export default picsReducer;
