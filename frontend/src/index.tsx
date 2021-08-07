import App from '@/App';
import { setToken } from '@store/auth/auth.slice';
import { store } from '@store/store';
import { loadToken } from '@utils/auth';
import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

loadToken();

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>,
  document.querySelector('#root')
);
