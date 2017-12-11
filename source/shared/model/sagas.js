import { call, take, select } from 'redux-saga/effects';

import { TAP_NODE, ACTIVATE_NODE, DRAW_NODE } from 'shared/model/reducer';
import { SET_BACKGROUND_PIC_SRC } from 'shared/pics/reducer';

import { getIsInteractiveMode } from 'shared/app/selectors';
import { getPreview } from 'shared/model/selectors';

import { NODE_NAME_ID } from 'shared/model/constants';

const focus = function* () {
    const isInteractive = yield select(getIsInteractiveMode);
    let elm = yield call([document, document.getElementById], NODE_NAME_ID);
    if (!isInteractive) {
        for (;;) {
            yield take([TAP_NODE, ACTIVATE_NODE, DRAW_NODE, SET_BACKGROUND_PIC_SRC]);
            const isPreview = yield select(getPreview);
            if (elm && !isPreview) {
                yield call([elm, elm.focus]);
            }
            if (!elm && !isPreview) {
                elm = yield call([
                    document,
                    document.getElementById
                ], NODE_NAME_ID);
            }
        }
    }
};

export default focus;
