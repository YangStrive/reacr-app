import React, { Component } from 'react';

const Form = (WrappedComponents) => {
  return class extends Component {
    constructor(props){
      super(props);
      this.state = {
        data:{},
        error:{}
      };
      this.options = {};
    }

    getFieldDecorator = (field, option) => {
      this.options[field] = option;
      return (InputComponent) => {
        return React.cloneElement(InputComponent, {
          name: field,
          value: this.state['data'][field] || '',
          onChange: this.handleChange,
          error: this.state['error'][field]
        })
      }
    };

    handleChange = (e) => {
      let {name, value} = e.target;
      this.setState({
        data: {
          ...this.state['data'],
          [name]: value
        }
      })
    };

    vaildateFields = (cb) => {
      let err = {};
      for(let field in this.options){
        if(this.options[field].rules){
          this.options[field].rules.forEach(rule => {
            if(rule.required && !this.state['data'][field]){
              err[field] = rule.message
            }
          })
        }
      }
      this.setState({
        error: err,
      })
      if(Object.keys(err).length){
        console.log('err', err)
        cb(err)
      }else{
        cb(null, this.state['data'])
      }
    };

    getFieldValues = () => {
      return this.state['data'];
    };

    getFiledValue = (field) => {
      if(field && typeof field !== 'string' && !Array.isArray(field)){
        console.error('resetFieldsValue 参数只能是字符串或者数组')
        return;
      }
      return this.state['data'][field]
    };

    resetFields = () => {
      this.setState({
        data: {},
        error: {}
      });
    };

    resetFieldsValue = (fields) => {
      //判断 fields 只能是字符串或者数组
      if(fields && typeof fields !== 'string' && !Array.isArray(fields)){
        console.error('resetFieldsValue 参数只能是字符串或者数组')
        return;
      }

      let newState = {};
      for(let field in this.state['data']){
        if(fields.includes(field)){
          newState[field] = this.state['data'][field]
        }
      }
      this.setState(newState);
    };

    setFieldsValues = (values) => {
      this.setState({
        data: {
          ...this.state['data'],
          ...values
        }
      })
    }

    getForm = () => {
      return {
        getFieldDecorator: this.getFieldDecorator,
        vaildateFields: this.vaildateFields,
        getFieldValues: this.getFieldValues,
        getFieldValue: this.getFiledValue,
        resetFields: this.resetFields,
        setFieldsValues: this.setFieldsValues,
      }
    }

    render(){
      return <WrappedComponents {...this.props} {...this.getForm()}/>
    }
  }
}

export default Form;