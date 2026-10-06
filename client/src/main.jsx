// ------------------------------------------------------------------
//  main.jsx
//  The starting point of the React app. It mounts <App /> into the
//  #root element that is inside index.html.
// ------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter lets us use <Link>, <Route> and useNavigate() */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
