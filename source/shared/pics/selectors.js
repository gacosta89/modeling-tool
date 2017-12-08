import { createSelector } from 'reselect';

import { getUtilizedPicIds } from 'shared/model/selectors';

export const getImageSrc = (state, id) =>
    (state.pics.allPics[id] && state.pics.allPics[id].src) || '';

export const getAllPics = state => state.pics.allPics;

export const getUtilizedPics = createSelector(
    getAllPics,
    getUtilizedPicIds,
    (allPics, ids) => ids.reduce((pics, id) => ({
        ...pics,
        [id]: allPics[id],
    }), {})
);
