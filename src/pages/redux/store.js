import createStore from './r.js';

console.log(createStore);
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

const store = createStore(reducer);

export default store;