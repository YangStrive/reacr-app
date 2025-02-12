
//import { useDispatch } from 'react-redux'
import React from 'react'
import { useSelector,useDispatch, connect } from '../cmRedux'

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

//使用类组件
class Child4 extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div>
      <p>name: {this.props.name}</p>
      <p>age: {this.props.age}</p>
      <button onClick={() => this.props.dispatch({type: 'changeName'})}>修改Name</button>
      <button onClick={() => this.props.dispatch({type: 'changeAge'})}>修改Age</button>
    </div>
  }
}

const Child5 = connect(state => state)(Child4)

export {
  Child1,
  Child2,
  Child3,
  Child5
}