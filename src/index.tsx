import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import './index.css';
import App from './App';

Sentry.init({
  dsn: 'https://82f7054f610a414a851fefeff7b3f78b@o502735.ingest.sentry.io/5868302',
  integrations: [new Integrations.BrowserTracing()],
  autoSessionTracking: true,
  release: '0.1.0',
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
