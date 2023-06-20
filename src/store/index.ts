import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import myAccount from './myAccount';
import chat from './chat';

const rootReducer = combineReducers({
  myAccount,
  chat,
});

const initialState = {};

const middlewares = [thunk];

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export type AppDispatch = typeof store.dispatch;
export default () => {
  return { store };
};
