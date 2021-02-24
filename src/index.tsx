import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import store from './redux/store';
import { Provider } from 'react-redux';

import ErrorBoundry from '../src/components/error_boundry';

ReactDOM.render(
    <ErrorBoundry>
      <Provider  store={store}>
        <App />
      </Provider>
    </ErrorBoundry>,
  document.getElementById('root')
);


