
import { useSelector, useDispatch } from 'react-redux'

const Child1 = (props) => {
  const name = useSelector(state => state.name)
  return <div>child1{name} {props.hobby}</div>
}

const Child2 = () => {
  const age = useSelector(state => state.age)
  return <div>child2{age}</div>
}

const Child3 = () => {
  const dispatch = useDispatch()
  return <div>
    <button onClick={() => dispatch({type: 'changeName'})}>修改Name</button>
    <button onClick={() => dispatch({type: 'changeAge'})}>修改Age</button>
  </div>
}

export {
  Child1,
  Child2,
  Child3
}