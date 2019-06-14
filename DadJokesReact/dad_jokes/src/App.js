import React, { Component } from 'react';
import {Link, Route, NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login'
import Register from './components/register'
import Jokes from './components/jokes'
class App extends Component {
  constructor() {
    super();
    this.state ={
      username: '',
      password: '',
    }
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value});
  }


  render() {
    const isLoggedIn = localStorage.getItem('jwt');
    return (
      <div>
        {isLoggedIn ? (
        <div>
          <h1>JOKES BELOW</h1>
        </div>
        ) : (
        <div>
          <div>
            <h2>Welcome to Dad Jokes</h2>
          </div>
          <p>
            Please Login or Register Below
          </p>
          <div>
          <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
          </div>
        </div> )}
        <Route path="/login" render={props => <Login {...props}  handleInput={this.handleInput} /> } />
        <Route exact path="/register" render={props => <Register {...props} userId={this.state.userId} submitRegister={this.submitRegister}  handleInput={this.handleInput} /> } />
        <Route path="/jokes" render={props => <Jokes {...props} jwt={this.isLoggedIn}/>} />
      </div>
    );
  }
}

export default withRouter(App);
