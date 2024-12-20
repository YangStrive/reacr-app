import { useRef } from 'react';

class FromStore{
  constructor(){
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
    this.rules = [];
    this.errors = {};
  }

  registerField = (name,entity) => {
    let {forceUpdate,rules = []} = entity;
    this.fieldEntities.push({name,entity:forceUpdate});
    this.rules.push({name,rules});
  }

  unregisterField = (name) => {
    this.fieldEntities = this.fieldEntities.filter(item => item.name !== name);
    delete this.store[name];
  }

  getFieldsValue = () => {
    return this.store;
  }
  getFieldValue = (key) => {
    return this.store[key];
  }
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }

    this.fieldEntities.forEach(entity => {
      if(entity.name in newStore){
        entity['entity']();
      }
    })
  }

  setFieldValue = (key,value) => {
    this.store[key] = value;
    console.log(this.store);
    this.fieldEntities.forEach(entity => {
      if(entity.name === key){
        entity['entity']();
      }
    })
  }

  submit = (cb) => {
    const { onFinish } = this.callbacks;
    onFinish(this.store);
  }

  setCallback = (cb) => {
    this.callbacks = {
      ...this.callbacks,
      ...cb
    }
  }

  //校验表单
  validate = () => {
    let errName = [];
    this.rules.forEach(rule => {
      let value = this.store[rule.name];
      let {rules} = rule;
      debugger
      rules.forEach(item => {
        if(item.required && !value){
          errName.push(rule.name);
          this.errors[rule.name] = item.message;
        }
      })
    })
    console.log(errName);

    if(errName.length){
      this.fieldEntities.forEach(entity => {
        if(errName.includes(entity.name)){
          entity['entity']();
        }
      })

      return this.errors;
    }else{
      return true;
    }
  }


  getFrom = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      submit: this.submit,
      setCallback: this.setCallback,
      validate: this.validate,
      errors: this.errors
    }
  }
}

const UseForm = () => {
  const formRef = useRef(null);

  return [formRef.current || (formRef.current = new FromStore()).getFrom()];
}

export default UseForm;