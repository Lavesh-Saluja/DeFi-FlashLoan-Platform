import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Footer from "./components/Footer.js"
import Navbar from "./components/Navbar.js"
import LoginPage from './components/LoginPage';
import reportWebVitals from './reportWebVitals';
import Forms2 from './components/Forms2';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
<Forms2/>
    <Footer/>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
