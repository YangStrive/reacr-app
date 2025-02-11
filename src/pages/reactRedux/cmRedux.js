//自定义 redux
import React from "react";

//使用context 跨组件通信
const Context = React.createContext();

//实现一个Provider
const Provider = ({store, children}) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

//子孙组件消费Provider的方式
//使用useContext 消费 Provider 的 va

const useSelector = (selector) => {
  const store = React.useContext(Context);
  const [, forceUpdate] = React.useReducer( x=>x + 1,0);

  React.useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => unsubscribe();
  }, [store]);

  return selector(store.getState());
}

const useDispatch = () => {
  const store = React.useContext(Context);
  return store.dispatch;
}

const useStore = () => {
  const store = React.useContext(Context);
  return store;
}

export {Provider, useSelector, useDispatch, useStore};