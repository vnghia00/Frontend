import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './styles/styles.scss';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import reduxStore, { persistor } from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />
      </IntlProviderWrapper>
    </Provider>,
  </React.StrictMode>

);
