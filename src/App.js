import React, { Component } from 'react';

import './App.css';

import styled from 'styled-components'



class App extends Component {
  state = {
    name: "viktor",
    age: 25,
    textField: 0
  }
  changeAge() {
    this.setState({age: 100})
  }
  readAge(element) {
    
    this.setState({age: element.target.value, textField: element.target.value})
  }

  render() { 
    const { name, age, textField } = this.state
    return (
        <div></div>
    );
  }
}



const Text = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid red;

`

export default App;
