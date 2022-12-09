import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '~/helpers/history';
import userReducer from './user';
import notifyReducer from './notify';
import { productGetALLReducer, productAddReducer, productGetByIdReducer } from './product';
import { categoryGetALLReducer } from './category';

export default (asyncReducers) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        notify: notifyReducer,
        product: productGetALLReducer,
        productAdd: productAddReducer,
        productGetById: productGetByIdReducer,
        categories: categoryGetALLReducer,
        ...asyncReducers,
    });
};
