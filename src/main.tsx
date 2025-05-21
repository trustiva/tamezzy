import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('نسخه جدید برنامه در دسترس است. آیا می‌خواهید به‌روزرسانی کنید؟')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('برنامه آماده استفاده در حالت آفلاین است');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 