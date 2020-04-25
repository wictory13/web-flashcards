import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {LoginContextProvider} from "./LoginContext";

ReactDOM.render(
  <React.StrictMode>
      <LoginContextProvider>
            <App />
      </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
