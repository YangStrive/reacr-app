import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  create(name){

    return (component) => {
      return React.createElement(component, {name})
    }
  }

}