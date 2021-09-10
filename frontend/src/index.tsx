import App from '@/App';
import { store } from '@store/store';
import { loadToken } from '@utils/auth';
import React from 'react';
import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './global.css';

const queryClient = new QueryClient();

loadToken();

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>,
  document.querySelector('#root')
);
