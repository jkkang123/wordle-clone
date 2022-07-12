import { combineReducers } from 'redux'
import reducer from './word'

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const wordlePersistConfig = {
  key: "wordle",
  storage: storage,
  timeout: null
};

const reducers = combineReducers({
  wordle : reducer
})

const wordleReducer = (state, action) => {
  if (action.type === 'RESET_WORD') {
    window.localStorage.removeItem('persist:wordle');
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default persistReducer(wordlePersistConfig, wordleReducer)