import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import i18n from './i18n';
import { ErrorScreen } from './components/error-screen';
import reduxStore from './store';
import { RouterComponent } from './routes';
import { reportWebVitals } from './reportWebVitals';
import './styles/theme.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const { store, persistor } = reduxStore();

const queryClient = new QueryClient();

export const App = () => (
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback='loading'>
                <RouterComponent />
                <ToastContainer theme='colored' newestOnTop />
              </Suspense>
            </I18nextProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
