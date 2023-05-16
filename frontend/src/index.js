import React from 'react';

import './index.css';

import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf.js';
import App from './App';
import configureStore from './store';
import { ModalProvider, Modal } from './context/Modal';

import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
