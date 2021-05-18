
import App from "./Components/app";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

console.log("Hello")

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
};
render();
store.subscribe(render);

export default store;
