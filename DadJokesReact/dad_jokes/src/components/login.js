import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginWrapper = styled.div`
    width: 350px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 10px 5px 5px grey;
    margin: 50px auto;
    padding: 10px;
    color: #303030;
    border: 1px solid #303030;
    
    
    
`

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid grey;
    padding-top: 10px;
    width: 300px;
    align-items: center;
    
`

const BoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Input = styled.input`
    width: 250px;
    height: 25px;
    border-radius: 5px;
    margin: 10px 0 30px 0;
`

const Button = styled.button`
    width: 250px;
    height: 30px;
    background: #BB1333;
    color: white;
    border-radius: 5px;
    font-size: 14px;
`






class Login extends React.Component {
state = {
    username: 'Lamo',
    password: 'lamopass'
}

handleSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:3300/api/login';
    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
      })
      .catch(error => {
        console.error(error);
      });
  };



    render() {
        return (
            <LoginWrapper>
                <div>
                    <h2>Login With Your Username and Password</h2>
                </div>
                <div>
                    <FormWrapper>
                            <BoxDiv>
                                <label>Username</label>
                                <Input 
                                type="text" 
                                placeholder="Username"
                                name="username"
                                value={this.state.username}
                                onChange={this.props.handleInput}
                                />
                                <label>Password</label>
                                <Input 
                                type="password"
                                placeholder='Password'
                                name="password"
                                value={this.state.password}
                                onChange={this.props.handleInput}
                                />
                            </BoxDiv>
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </FormWrapper>
                </div>
            </LoginWrapper>
        )
    }
}

export default Login;
