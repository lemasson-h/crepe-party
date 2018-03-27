import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import adminCrepeReducer from './store/reducers/adminCrepeReducer';
import adminIngredientReducer from './store/reducers/adminIngredientReducer';
import adminUserReducer from './store/reducers/adminUserReducer';
import authReducer from './store/reducers/authReducer';
import crepeReducer from './store/reducers/crepeReducer';
import ingredientReducer from './store/reducers/ingredientReducer';
import orderReducer from './store/reducers/orderReducer';
import redirectReducer from './store/reducers/redirectReducer';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
  adminCrepe: adminCrepeReducer,
  adminIngredient: adminIngredientReducer,
  adminUser: adminUserReducer,
  auth: authReducer,
  crepes: crepeReducer,
  ingredients: ingredientReducer,
  order: orderReducer,
  globalRedirect: redirectReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
