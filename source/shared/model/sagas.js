import { call, put, takeLatest } from 'redux-saga/effects';

import { setBackgroundPicSrc, SET_BACKGROUND_PIC } from 'shared/model/reducer';

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
        yield put(setBackgroundPicSrc({ src }));
    } catch (e) {
        console.error(e.message);
    }
};

const watchSetBackground = function* () {
    yield takeLatest(SET_BACKGROUND_PIC, loadFile);
};

export default watchSetBackground;
