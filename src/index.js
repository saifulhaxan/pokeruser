import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from 'react-toastify';

const stripePromise = loadStripe("pk_test_51QIpJYKYzGM8MJQBPNCrQCcm0E1n3nNziKBwx7Kq8fKyH0JKFhzegzSW8WRcT2lrdTjh1gTGnBTZQaZQ3z1wyfxH00yTtZYH9j");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
    <div className='loaderBox d-none'>
      <div className="custom-loader"></div>
    </div>
    <ToastContainer/>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
