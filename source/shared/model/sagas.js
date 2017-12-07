import {
    call,
    put,
    takeLatest,
    select,
    all,
    fork,
    takeEvery } from 'redux-saga/effects';

import { generate } from 'shortid';

import { putStorage, getStorage } from 'shared/app/utils';

import {
    setBackgroundPicSrc,
    setPics,
    SET_BACKGROUND_PIC,
    SET_BACKGROUND_PIC_SRC } from 'shared/pics/reducer';

import { getAllPics } from 'shared/pics/selectors';

const readFile = file => new Promise(res => {
    const reader = new FileReader();

    reader.onload = e => res(e.target.result);

    reader.readAsDataURL(file);
});

/*
Description: loadFile (redux-saga) saga generator.

Rationale: Observe async actions and fork async task that can potentially dispach
  a new action to the store.

  Generally used for networking, IO.

  redux-saga uses generators to deal with complex async flows in a secuential way.

  redux-saga allows to unit test side effects by its effect creator pattern (like call and put).
  This pattern will not directly call an IO side effect like readFile.
  On the contrary it will create a "call effect" instructing the redux-saga IO machine to
  take control, execute the effect and return the control to the saga when the effect "done".
*/

const loadFile = function* ({ payload: { file }}) {
    try {
        const src = yield call(readFile, file);
        const id = yield call(generate);
        yield put(setBackgroundPicSrc({ src, id }));

    } catch (e) {
        console.error(e.message);
    }
};

const persistPics = function* () {
    try {
        const pics = yield select(getAllPics);
        yield call(putStorage, 'pics', JSON.stringify(pics));
    } catch (e) {
        console.error(e.message);
    }
};

const readPics = function* () {
    try {
        const allPics = yield call(getStorage, 'pics');
        yield put(setPics({ allPics: allPics ? JSON.parse(allPics) : {}}));
    } catch (e) {
        console.error(e.message);
    }
};

const watchSetBackground = function* () {
    yield takeLatest(SET_BACKGROUND_PIC, loadFile);
};

const watchPersistPics = function* () {
    yield takeEvery(SET_BACKGROUND_PIC_SRC, persistPics);
};

const rootSaga = function* () {
    yield all([
        yield fork(watchSetBackground),
        yield fork(watchPersistPics),
        yield fork(readPics),
    ]);
};

export default rootSaga;
