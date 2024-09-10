import { useRef } from 'react';

class FromStore{
  constructor(){
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  registerField = (name,entity) => {
    this.fieldEntities.push({name,entity});
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

  getFrom = () => {
    return {
      setStore: this.setStore,
      getStore: this.getStore,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      submit: this.submit,
      setCallback: this.setCallback,
    }
  }
}

const UseForm = () => {
  const formRef = useRef(null);

  return [formRef.current || (formRef.current = new FromStore()).getFrom()];
}

export default UseForm;