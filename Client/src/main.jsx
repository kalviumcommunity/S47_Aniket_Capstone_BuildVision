import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  
    <Auth0Provider
      domain="dev-bhzywqcftmwjth02.us.auth0.com"
      clientId="SFLCcjHxeJQlxI4xLXIjR0K3RdraTT8c"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  /* </React.StrictMode> */
)
