import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router';
import AppRoutes from './config/Routes.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Toaster />
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  </BrowserRouter>
);
