// const logger = store => next => action => {
//   console.log('logger', store.getState());
//   next(action);
//   console.log('logger', store.getState());
// }

// export default logger;
//使用普通函数实现
const logger = function(store) {
  console.log('logger1')
  return function(next) {
    console.log('logger2')
    return function(action) {
      console.log('logger3')
      console.log('logger', store.getState());
      next(action);
      console.log('logger', store.getState());
    }
  }
}

export default logger;