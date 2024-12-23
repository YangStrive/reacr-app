import { useEffect } from 'react';


const About = () => {
  useEffect(() => {
    console.log('about');
  }, []);

  //函数柯里化
  const  fn1 = (a) => {
    console.log('fn1', a);
    return a + 1;
  }

  const fn2 = (a) => {
    console.log('fn2', a);
    return a + 2;
  }

  const fn3 = (a) => {
    console.log('fn3', a);
    return a + 3;
  }

  const compose = (...fns) => {
    if(fns.length === 0){
      return arg => arg;
    }

    if(fns.length === 1){
      return fns[0];
    }

    //整合函数，实际上是利用了闭包原理，当前的函数始终是执行上一个函数和b
    return fns.reduce( (a,b) => {
      return (...args) => {
        return a(b(...args));
      }
    })
  }
  const result = compose(fn1, fn2, fn3)(0);

  return (
    <h2>About</h2>
  );
}

export default About;