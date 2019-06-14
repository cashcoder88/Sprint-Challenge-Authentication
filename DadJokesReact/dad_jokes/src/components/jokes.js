import React from 'react';
import axios from 'axios';


class Jokes extends React.Component {
  state = {
    jokes: [],
  };

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    axios
      .get('http://localhost:3300/api/jokes', {
        headers: {
          Authorization: jwt
        }
       })
      .then(res => {
        console.log('jokes', res.data);
        
        this.setState(() => ({ jokes: res.data }));
      })
      .catch(res => {
        console.error(res);
      });
  }

  render() {
    return (
      <div>
        <h2>Jokes</h2>
          {this.state.jokes.map(item => (
            <p key={item.id}>{item.joke}</p>
          ))}
      </div>
    );
  }
}

export default Jokes;