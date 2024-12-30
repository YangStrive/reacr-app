export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
      );
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const compose = ( ...fns ) => {
      if(fns.length === 0){
        return arg => arg;
      }

      if(fns.length === 1){
        return fns[0];
      }

      return fns.reduce( (a,b) => {
        return (...args) => {
          return a(b(...args));
        }
      })
    }

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    }
  }
}