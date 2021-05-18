import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/authReducer';
import { authUiReducer } from '../reducers/authUiReducer';
import { resultsReducer } from '../reducers/resultsReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  auth: authReducer,
  authUi: authUiReducer,
  results: resultsReducer
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
