import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import './helpers/format';
import i18n from '~/languages';
import { I18nextProvider } from 'react-i18next';
import * as serviceWorker from './serviceWorker';
import * as ReactDOM from 'react-dom';
import GlobalStyles from '~/components/GlobalStyles';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'antd/dist/reset.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </I18nextProvider>
    </Provider>,
);

if (process.env.NODE_ENV !== 'development') {
    console.log = () => {};
    console.debug = () => {};
}

serviceWorker.unregister();
