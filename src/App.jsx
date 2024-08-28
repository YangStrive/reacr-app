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

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
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
