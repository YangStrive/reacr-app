import Counter from './components/Counter'
import { Provider } from 'react-redux';
import store from './store'


const UseReduxPage = () => {
  return (
    <div> 
      <h1>useReduxPage</h1>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  )
}

export default UseReduxPage
