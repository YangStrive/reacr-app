import createStore from '../redux/creatStore.js';

const reducer = (state = {name: 'react-redux', age: 18}, action) => {
  switch (action.type) {
    case 'changeName':
      return {
        ...state,
        name: 'react-redux-1' + Math.random().toFixed(2)
      }
    case 'changeAge':
      return {
        ...state,
        age: state.age + 1
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store