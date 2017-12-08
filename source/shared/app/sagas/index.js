import { all, fork } from 'redux-saga/effects';

import modelSagas from 'shared/model/sagas';
import picsSagas from 'shared/pics/sagas';
import configSagas from 'shared/app/sagas/config';

const rootSaga = function* () {
    yield all([
        yield fork(modelSagas),
        yield fork(picsSagas),
        yield fork(configSagas),
    ]);
};

export default rootSaga;
