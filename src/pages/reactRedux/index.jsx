
//import { Provider } from 'react-redux'
import { Provider } from './cmRedux';
import {
  Child1,
  Child2,
  Child3,
  Child5
} from './components/index'
import store from './store'
const ReactReduxPage = () => {
  return <Provider store={store}>
    <>
      <Child1 hobby="react" />
      <Child2 />
      <Child3 />
      <Child5 />
    </>
  </Provider>
}

export default ReactReduxPage