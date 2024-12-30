import { useState, useEffect } from 'react';
import store from './store';


const ReduxPage = () => {
  const [o1, up] = useState(0);


  useEffect(() => {
    console.log('store', 999);
   const unsubscribe = store.subscribe(() => {
      up((o1) => o1 + 1);
      console.log('store.getState()', store.getState());
    });

    // 返回一个清理函数，以便在组件卸载时取消订阅
    return () => {
      unsubscribe();
    };
  }, []); // 空依赖数组，确保只在初始化时调用一次
  

  return (
    <div>
      <h1>Redux Page</h1>
      <div>
        {store.getState().count}
        <button onClick={() => store.dispatch({type: 'add'})}>add</button>
        <button onClick={() => store.dispatch({type: 'dec'})}>dec</button>
        <button
          onClick={() =>
            store.dispatch((dispatch) => {
              setTimeout(() => {
                dispatch({ type: 'add' });
              }, 1000);
            })
          }
        >
          async add
        </button>
      </div>
    </div>
  );
}

export default ReduxPage;