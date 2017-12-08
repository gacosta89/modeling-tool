import { put, call, select, take } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { setMode } from 'shared/app/reducer/config';
import { getAppMode, getPersisted } from 'shared/app/selectors';

import { INTERACTIVE_MODE } from 'shared/app/constants';

import { createIniData } from 'shared/app/utils';

const persistModeAndState = function* () {
    yield take(LOCATION_CHANGE);
    const mode = yield select(getAppMode);
    const persisted = yield select(getPersisted);

    if (mode === INTERACTIVE_MODE && !persisted) {
        yield put(setMode({ mode }));
        const dataToPersist = yield select(x => x);
        try {
            yield call(createIniData, JSON.stringify(dataToPersist));
        } catch (e) {
            console.log('Unable to persist data');
        }
    }
};

export default persistModeAndState;
