import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';  
import { setUser } from './Redux/action';
import App from './App';

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    store.dispatch(setUser(user.user_id, user.user_name, user.like_total));
}

const container = document.getElementById('app');
const root = createRoot(container); 

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);