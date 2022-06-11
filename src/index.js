import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {UserContextProvider} from './components/context'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
