import React,{Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import routerConfig from './router'

import './App.css';
//TODO: 还差一个校验教育经历与工作经历的的逻辑
const initRouter = (routerConfig) => {
  return routerConfig.map((route, index) => {
    let {path, element} = route;
    let Component = element;
    return (
      <Route key={index} path={path} element={<Component/>}/>
    )
  })
}

//BUG: 不能使用index作为key，因为index会变化，导致key变化，导致重新渲染，导致页面闪烁
const initNav = (routerConfig) => {
  return routerConfig.map((route, index) => {
    let {path} = route;
    return (
      <li key={index}>
        <Link to={path}>{path}</Link>
      </li>
    )
  })
}

//NOTE: 如果存在多个路由，可以使用map来遍历，然后返回一个数组，这样就不用一个一个写了
function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <ul className='nav-list'>
            {initNav(routerConfig)}
          </ul>
          <Routes>
            {initRouter(routerConfig)}
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
