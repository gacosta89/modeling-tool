export const getImageSrc = (state, id) =>
    (state.pics.allPics[id] && state.pics.allPics[id].src) || '';

export const getAllPics = state => state.pics.allPics;
