export default function combineReducers(reducers) {
  return function combination(state, action) {
    let nextState = {};

    for (let key in reducers) {
      const reducer = reducers[key];
      nextState = reducer(state, action);
    }


    return nextState;
  };
}