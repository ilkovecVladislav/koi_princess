import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_RELEASE) {
  Sentry.init({
    dsn: 'https://82f7054f610a414a851fefeff7b3f78b@o502735.ingest.sentry.io/5868302',
    release: process.env.REACT_APP_SENTRY_RELEASE,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
