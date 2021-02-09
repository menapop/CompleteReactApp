import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './Store/reducers/burgerBuilder';
import orderReducer from './Store/reducers/order' ;
import authReducer from './Store/reducers/auth';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {logoutSaga} from './Store/sagas/auth';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers ({
   burgerBuilder: burgerBuilderReducer,
   order: orderReducer,
   auth: authReducer
})

  
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware)
 ));
 sagaMiddleware.run(logoutSaga);
const app =(
    <Provider store={store}>
        <BrowserRouter>
              <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
