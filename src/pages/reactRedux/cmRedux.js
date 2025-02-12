//自定义 redux
import React,{useSyncExternalStore,useState, useCallback, useLayoutEffect} from "react";

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
  // const [, forceUpdate] = React.useReducer( x=>x + 1,0);

  // React.useLayoutEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     forceUpdate();
  //   });
  //   return () => unsubscribe();
  // }, [store]);
  //使用useSyncExternalStore替换上面的代码
  const { getState, subscribe } = store;
  const state = useSyncExternalStore(subscribe, getState);

  return selector(state);
}

const useDispatch = () => {
  const store = React.useContext(Context);
  return store.dispatch;
}

const useStore = () => {
  const store = React.useContext(Context);
  return store;
}

function useForceUpdate() {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);

  return update;
}
const connect = (mapStateToProps, mapDispatchToProps) => {

  return (Component) => {
    return (props) => {
      const state = useStore().getState();
      const subscribe = useStore().subscribe;
      const dispatch = useStore().dispatch;
      const stateProps = mapStateToProps ? mapStateToProps(state) : state;    

      const forceUpdate = useForceUpdate();
      // DOMeffect
      useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
          forceUpdate();
        });
        return () => {
          unsubscribe();
        };
      }, [subscribe]);
      const newProps = {
        ...props, 
        ...stateProps,
        dispatch,
      }
      return <Component {...newProps} />
    }
  }
}

export {Provider, useSelector, useDispatch, useStore, connect};