import React, { useState, useEffect } from 'react';  
import FieldContext from '../../fieldContext';

const Filed = ({label,name,children}) => {
  // 定义一个状态变量和一个更新状态的函数
  const [_, setForceUpdate] = useState(0);


  let form = React.useContext(FieldContext);
  let {getFieldValue, setFieldValue} = form;

  useEffect(() => {
    form.registerField(name, forceUpdate);
    return () => {
      form.unregisterField(name);
    }
  }, [name]);
  // 强制更新函数
  const forceUpdate = () => {
    setForceUpdate(prev => prev + 1);
  };

  const getControlled = () => {
    return {
      value:getFieldValue(name) || '',
      onChange: (e) => {
        setFieldValue(name, e.target.value)
      }
    }
  }
  
  let newChildren = React.cloneElement(children, getControlled())

  return (
    <div className='form-item'>
      <label>{label}</label>
      {newChildren}
    </div>
  )
}

export default Filed;