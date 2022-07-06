import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { App } from './app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const { version } = packageJson;
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.REACT_APP_ENV,
  release: version,
  tracesSampleRate: 1.0,
});

const mount = (element: Element | Document | DocumentFragment | null) =>
  ReactDOM.render(<App />, element);

const root = document.querySelector('#root');

if (root) {
  mount(root);
}

export { mount };
