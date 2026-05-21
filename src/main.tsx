import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for ResizeObserver loop completed with undelivered notifications
if (typeof window !== 'undefined') {
  const resizeObserverError = /ResizeObserver loop completed with undelivered notifications/;
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && resizeObserverError.test(args[0])) {
      return;
    }
    originalError(...args);
  };
  
  // Also handle it via error event for some browsers/libraries
  window.addEventListener('error', (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications' || 
        e.message === 'ResizeObserver loop limit exceeded') {
      const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
      const resizeObserverErrDiv2 = document.getElementById('vite-error-overlay');
      if (resizeObserverErrDiv) resizeObserverErrDiv.style.display = 'none';
      if (resizeObserverErrDiv2) resizeObserverErrDiv2.style.display = 'none';
      e.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
