const Thunk3 = store => next => action =>{
  console.log('Thunk', store.getState());
  if(typeof action === 'function'){
    return action(store.dispatch, store.getState);
  }
  return next(action);
}

//export default Thunk;
//使用普通函数实现
const Thunk = function(store) {
  console.log('Thunk1');
  return function(next) {
    console.log('Thunk2');
    return function(action) {
      console.log('Thunk3');
      if(typeof action === 'function'){
        return action(store.dispatch, store.getState);
      }
      return next(action);
    }
  }
}


export default Thunk;