import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '~/helpers/history';
import userReducer from './user';
import notifyReducer from './notify';
import { productAddReducer, productGetReducer } from './product';
import { categoryGetALLReducer } from './category';

export default (asyncReducers) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        notify: notifyReducer,
        productAdd: productAddReducer,
        productGet: productGetReducer,
        categories: categoryGetALLReducer,
        ...asyncReducers,
    });
};
