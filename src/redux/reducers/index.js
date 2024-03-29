import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '~/helpers/history';
import userReducer from './user';
import notifyReducer from './notify';
import sizeReducer from './size';
import colorReducer from './color';

export default (asyncReducers) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        notify: notifyReducer,
        size: sizeReducer,
        color: colorReducer,
        ...asyncReducers,
    });
};
