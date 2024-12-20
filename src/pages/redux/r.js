const  createStore = (reducer, preloadedState, enhancer) => {
  let currentStatus;
  let currentListeners = [];

  const getState = () => currentStatus;

  const dispatch = action => {
    currentStatus = reducer(currentStatus, action);
    currentListeners.forEach(listener => listener());
    console.log('currentStatus', currentStatus);
    return action;
  }

  const subscribe = listener => {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    }
  }
  

  dispatch({type: Symbol()});
  return {
    getState,
    dispatch,
    subscribe
  }

}

export default createStore;