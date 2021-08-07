import App from '@/App';
import { setToken } from '@store/auth/auth.slice';
import { store } from '@store/store';
import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function loadToken() {
  try {
    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    console.log('sessionStorage_token: ', token);
    store.dispatch(setToken(token));
  } catch (error) {
    console.log('sessionStorage is not working');
  }
}

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
