import React, { Component } from 'react';

const Form = (WrappedComponents) => {
  return class extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.options = {};
    }

    getFieldDecorator = (field, option) => {
      this.options[field] = option;
      return (InputComponent) => {
        return React.cloneElement(InputComponent, {
          name: field,
          value: this.state[field] || '',
          onChange: this.handleChange,
          ...option
        })
      }
    };

    handleChange = (e) => {
      let {name, value} = e.target;
      this.setState({
        [name]: value
      })
    };

    vaildateFields = (cb) => {
      let err = [];
      for(let field in this.options){
        if(this.options[field].rules){
          this.options[field].rules.forEach(rule => {
            if(rule.required && !this.state[field]){
              err.push({
                [field]: rule.message
              })
            }
          })
        }
      }
      if(err.length){
        cb(err)
      }else{
        cb(null, this.state)
      }
    };

    getFieldValues = () => {
      return this.state;
    };

    getFiledValue = (field) => {
      if(field && typeof field !== 'string' && !Array.isArray(field)){
        console.error('resetFieldsValue 参数只能是字符串或者数组')
        return;
      }
      return this.state[field]
    };

    resetFields = () => {
      this.setState({});
    };

    resetFieldsValue = (fields) => {
      //判断 fields 只能是字符串或者数组
      if(fields && typeof fields !== 'string' && !Array.isArray(fields)){
        console.error('resetFieldsValue 参数只能是字符串或者数组')
        return;
      }

      let newState = {};
      for(let field in this.state){
        if(fields.includes(field)){
          newState[field] = this.state[field]
        }
      }
      this.setState(newState);
    }



    getForm = () => {
      return {
        getFieldDecorator: this.getFieldDecorator,
        vaildateFields: this.vaildateFields,
        getFieldValues: this.getFieldValues,
        getFieldValue: this.getFieldValue,
        resetFields: this.resetFields,
      }
    }



    render(){
      return <WrappedComponents {...this.props} {...this.getForm()}/>
    }
  }
}

export default Form;