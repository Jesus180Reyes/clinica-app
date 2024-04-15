import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './presentation/components/layouts/index.css';
import { RouterProvider } from 'react-router-dom';
import { RouterAdapter } from './config/router/router.tsx';
import { Provider } from 'react-redux';
import {store} from './presentation/store/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={RouterAdapter.router} />
    </Provider>
  </React.StrictMode>,
);
