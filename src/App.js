import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
import './App.css';

import styled from 'styled-components'



class App extends Component {
  state = {
    name: "viktor",
    age: 25,
    textField: 0,
    token: null,
    user: null

  }
  componentDidMount() {
    this.postData(`http://localhost:8080/api/auth/signup`, {name: "viktor", password: "test", email: "v@g.com"})
  .then(data => {
    const tokenObject = JSON.stringify(data)
    this.setState({token: tokenObject, user: JSON.stringify(jwtDecode(data.token))})
  }) // JSON-string from `response.json()` call
  .catch(error => console.error(error));


  }
  changeAge() {
    this.setState({age: 100})
  }
  readAge(element) {
    
    this.setState({age: element.target.value, textField: element.target.value})
  }
  postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }
  getListOfItems() {

  }
  render() { 
    const { name, age, textField } = this.state
    return (
        <div>
          <button>Lend</button>
          <button>Borrow</button>

          <div></div>

        </div>
    );
  }
}




export default App;
