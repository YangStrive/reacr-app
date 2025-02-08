import createStore from './creatStore.js';
import applyMiddleware from './applyMiddleware.js';
import logger from './logger.js';
import Thunk from './thunk.js';
import combineReducers from './combineReducers.js';
const currentStatus = {
  count: 0,
};

const reducer = (state = currentStatus, action) => {
  switch (action.type) {
    case 'add':
      return {
        count: state.count + 1,
      };
    case 'dec':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

const store = createStore(combineReducers({count:reducer}), applyMiddleware( Thunk, logger ));  

export default store;