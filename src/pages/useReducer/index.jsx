import React, { useReducer,useEffect, useLayoutEffect } from 'react';

const initialState = { count: 1,color: 'blue' };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'color':
      return { color: 'red' };
    default:
      throw new Error();
  }
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('useEffect'); 
  }, [state]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, [state]);

  return (
    <div>
      <p className='count' style={{color: state.color}}>Count: {state.count}</p>
      <div style={{backgroundColor: 'red',width: state.count*10 + 'px' ,height: '100px'}}></div>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'color' })}>color</button>
    </div>
  );
}