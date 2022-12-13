import { promiseMiddleware } from '@adobe/redux-saga-promise';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from '~/helpers/history';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createReducer from './reducers';
import rootSaga from './saga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const _routerMiddleware = routerMiddleware(history);
function createSagaInjector(runSaga, rootSaga) {
    const injectedSagas = new Map();

    const isInjected = (key) => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        if (isInjected(key)) return;
        const task = runSaga(saga);
        injectedSagas.set(key, task);
    };
    injectSaga('root', rootSaga);
    return injectSaga;
}

//enable trace redux dev tools
const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 20 })) ||
    composeWithDevTools;

const store =
    process.env.NODE_ENV === 'development'
        ? createStore(
              createReducer(),
              {},
              // replace composeWithDevTools by composeEnhancers
              composeEnhancers(applyMiddleware(routerMiddleware(history), promiseMiddleware, sagaMiddleware, logger)),
          )
        : createStore(
              createReducer(),
              {},
              compose(applyMiddleware(routerMiddleware(history), promiseMiddleware, sagaMiddleware)),
          );

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));

    console.log('asyncReducers', store.asyncReducers);
    // Return the modified store
    return store;
};

store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
export default store;
