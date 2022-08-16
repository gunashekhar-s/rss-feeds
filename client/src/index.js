import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './redux/store';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
const store = configureStore()
store.subscribe(() => {
  console.log("store updated", store.getState())
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
