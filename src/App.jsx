import React,{Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import routerConfig from './router'

import './App.css';

const initRouter = (routerConfig) => {
  return routerConfig.map((route, index) => {
    let {path, element} = route;
    let Component = element;
    return (
      <Route key={index} path={path} element={<Component/>}/>
    )
  })
}

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
