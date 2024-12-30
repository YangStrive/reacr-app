import { useState } from 'react';

const NoRedux = () => {
  const [count, setCount] = useState(0);


  return (
    <div>
      <h1>Count: {count}</h1>
      <button>Increment</button>
    </div>
  );
}

export default NoRedux;