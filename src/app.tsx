import React, { Suspense } from 'react';
import './services/http/interceptors';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorScreen } from './components/error-screen';
import { reportWebVitals } from './reportWebVitals';
import { RouterComponent } from './routes';
import reduxStore from './store';
import './styles/theme.css';

export const { store, persistor } = reduxStore();

export const App = () => (
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <Suspense fallback='loading'>
            <RouterComponent />
            <ToastContainer theme='colored' newestOnTop />
          </Suspense>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
reportWebVitals();
