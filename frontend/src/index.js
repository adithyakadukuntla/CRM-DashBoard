import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import bootstrap line 
import { ClerkProvider } from '@clerk/clerk-react'

import 'bootstrap/dist/css/bootstrap.min.css';
const PUBLISHABLE_KEY ='pk_test_b24tcHVwLTU0LmNsZXJrLmFjY291bnRzLmRldiQ'
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
