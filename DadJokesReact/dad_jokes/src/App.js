import React, { Component } from 'react';
import {Link, Route, NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login'
import Register from './components/register'

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
    return (
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
        <Route path="/login" render={props => <Login {...props}  handleInput={this.handleInput} /> } />
        <Route exact path="/register" render={props => <Register {...props} userId={this.state.userId} submitRegister={this.submitRegister}  handleInput={this.handleInput} /> } />

      </div>
    );
  }
}

export default withRouter(App);
