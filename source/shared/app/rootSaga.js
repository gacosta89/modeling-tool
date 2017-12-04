import { all, fork } from 'redux-saga/effects';

import modelSagas from 'shared/model/sagas';

const rootSaga = function* () {
    yield all([
        yield fork(modelSagas),
    ]);
};

export default rootSaga;
