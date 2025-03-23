// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import store from '@/store/store'
// import { Toaster } from '@/components/ui/sonner'



// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <Provider store={store}>
//     <App />
//      <Toaster></Toaster>
//     </Provider>
//   </BrowserRouter>
// )




import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')).render(
 /*  <StrictMode> */
    <BrowserRouter
      future={{
        v7_startTransition: true, // Opt into the new behavior
        v7_relativeSplatPath: true, // Opt into the new behavior
      }}
    >
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  /* </StrictMode> */
);