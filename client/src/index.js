import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PostContextProvider } from './context/PostContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const clientid =
  '635499527876-uqq1oidqrqqt70o4b6immvir4olu4oht.apps.googleusercontent.com';
root.render(
  <GoogleOAuthProvider clientId={clientid}>
    <PostContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostContextProvider>
  </GoogleOAuthProvider>
);
