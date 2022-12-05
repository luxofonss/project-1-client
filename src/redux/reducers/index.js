import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '~/helpers/history';
import userReducer from './user';
import notifyReducer from './notify';
import { productGetALLReducer, productAddReducer, productGetByIdReducer } from './product';

export default (asyncReducers) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        notify: notifyReducer,
        product: productGetALLReducer,
        productAdd: productAddReducer,
        productGetById: productGetByIdReducer,
        ...asyncReducers,
    });
};
