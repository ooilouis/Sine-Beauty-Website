import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ContentProvider } from './contexts/ContentContext';
import { CmsDataProvider } from './contexts/CmsDataContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CmsDataProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </CmsDataProvider>
  </React.StrictMode>
);
