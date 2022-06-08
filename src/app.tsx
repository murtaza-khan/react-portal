import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from 'react-error-boundary';
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
            <Suspense fallback='loading'>
              <RouterComponent />
              <ToastContainer theme='colored' newestOnTop />
            </Suspense>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
reportWebVitals();
