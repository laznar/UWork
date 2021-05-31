import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { authUiReducer } from '../reducers/authUiReducer';
import { resultsReducer } from '../reducers/resultsReducer';
import { opportunitiesReducer } from '../reducers/opportunitiesReducer';
import { dashboardReducer } from '../reducers/dashboardReducer';
import { chatReducer } from '../reducers/chatReducer';

const reducers = combineReducers({
  auth: authReducer,
  authUi: authUiReducer,
  results: resultsReducer,
  opportunities: opportunitiesReducer,
  dashboard: dashboardReducer,
  chat: chatReducer
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
