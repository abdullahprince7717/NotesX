import { all } from 'redux-saga/effects';
import watchNoteActions from './note.sagas';
import watchAuthActions from './auth.saga';
import watchTagActions from './tag.saga';
import watchUserActions from './user.saga';
import watchNotificationActions from './notifcation.saga';

export default function* rootSaga() {
    yield all([
        watchNoteActions(),
        watchAuthActions(),
        watchTagActions(),
        watchUserActions(),
        watchNotificationActions()
    ]);
}