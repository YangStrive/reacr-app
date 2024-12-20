import React, { useState, useEffect } from 'react';  
import FieldContext from '../../fieldContext';

const Filed = ({
  label,
  name,
  children,
  rules,
}) => {
  //这里为什么打印了两次
  //
  console.log('filed',name);
  // 定义一个状态变量和一个更新状态的函数
  const [_, setForceUpdate] = useState(0);
  const {
    onChange,
    onBlur,
    onFocus,
    onInput,
  } = children.props;

  let form = React.useContext(FieldContext);
  let {
      getFieldValue, 
      setFieldValue, 
      registerField,
      unregisterField,
      errors,
    } = form;

  useEffect(() => {
    console.log('registerField',name);
    registerField(name, {forceUpdate, rules});
    return () => {
      console.log('unregisterField',name);
      unregisterField(name);

    }
  }, []);

  // 强制更新函数
  const forceUpdate = () => {
    setForceUpdate(prev => prev + 1);
  };

  //
  const getControlled = () => {
    return {
      value:getFieldValue(name) || '',
      onChange: (e) => {
        setFieldValue(name, e.target.value);
        if(onChange){
          onChange(e);
        }
      },
      onBlur: (e) => {
        if(onBlur){
          onBlur(e);
        }
      },
      onFocus: (e) => {
        if(onFocus){
          onFocus(e);
        }
      },
      onInput: (e) => {
        if(onInput){
          onInput(e);
        }
      },

    }
  }
  
  let newChildren = React.cloneElement(children, getControlled())

  return (
    <div className='form-item'>
      <label>{label}</label>
      {newChildren}
      {errors[name] && <div style={{color: 'red'}}>{errors[name]}</div>}
    </div>
  )
}

export default Filed;