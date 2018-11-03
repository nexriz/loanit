import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
import './App.css';

import styled from 'styled-components'
function postData(url = ``, data = {}) {
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



function getData(url = ``, token = "") {
  console.log("getdata", token)
  // Default options are marked with *
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + token
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client

    })
    .then(response => response.json()); // parses response to JSON
}


class App extends Component {
  state = {
    name: "viktor",
    age: 25,
    textField: 0,
    token: null,
    user: null,
    page: "home",
    navArr: ["home"]

  }
  componentWillMount() {
    postData(`http://localhost:8080/api/auth/signup`, {name: "viktor", password: "test", email: "v@g.com"})
  .then(data => {


    this.setState({token: data.token, user: JSON.stringify(jwtDecode(data.token))})
  }) 
  .catch(error => console.error(error));


  }
  changeAge() {
    this.setState({age: 100})
  }
  readAge(element) {
    
    this.setState({age: element.target.value, textField: element.target.value})
  }

  getListOfItems() {

  }
  navigateToLend() {
    const newNavList = this.state.navArr
    newNavList.push("lend")
    this.setState({page: "lend", navArr: newNavList})
  }
  navigateToBorrow() {
    const newNavList = this.state.navArr
    newNavList.push("borrow")


    this.setState({page: "borrow", navArr: newNavList})
  }
  navigateBack() {
    const newNavList = this.state.navArr
    newNavList.pop()
    this.setState({page: newNavList[newNavList.length - 1], navArr: newNavList})
  }
  render() { 
    const { name, age, textField, page, token} = this.state
    console.log(this.state)
    return (
        <div>
          {
            this.state.page === "home" 
            ? (
              <Container>
                <Button onClick={() => this.navigateToLend()}>LEND</Button><br />
                <Button onClick={() => this.navigateToBorrow()}>BORROW</Button>
              </Container>
            ) 
            : (<button style={{width: "80px", height: "30px"}} onClick={() => this.navigateBack()} >back</button>)
          }
          

          <div>
            {Page(page, token)}
          </div>

        </div>
    );
  }
}

const Container = styled.div`
  width: 200px;

  margin:auto;
`
const Button = styled.button`
  width: 100px;
  height: 100px;
  background-color: red;
  font-size: 18px;
  color: white;
  font-weight: 500;
  border-radius: 25px;

`


class LendList extends Component {
  componentWillMount() {
    const { token } = this.props
    this.setState({list: [1,2,3,4]})
  }
  render() {
    return (
      <div>
      <ul>
        {this.state.list.map((i) =>  <li key={i}>{i}</li> )}
      </ul>


      </div>
    )
  }
}
class BorrowList extends Component {
  state = {
    list: []
  }
  componentWillMount() {
    const { token } = this.props
    console.log(token)
    getData("http://localhost:8080/api/database/items", token).then(data => {this.setState({list: data.items})})


  }
  render() {
    return (
      <div>
      <ul>
        {this.state.list.map((item, i) =>  <li key={i}>{item.itemName}</li> )}
      </ul>


      </div>
    )
  }
}


const Con = styled.div`
width: 100%
height: 100%!important
`
const Home = () => (
  <div>
    
  </div>
)

const Page = (location, token) => {
  switch (location) {
    case "lend": return <LendList token={token}></LendList>
    case "borrow": return <BorrowList token={token}></BorrowList>
    default: return <Home></Home>
  }
}





export default App;
