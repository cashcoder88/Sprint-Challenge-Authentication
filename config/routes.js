const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../auth/authenticate');
const Model = require('./model.js');
const secrets = require('../auth/secret.js')
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash;

  Model.add(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({
      error: 'A problem has occured with your registration, please try again'
    })
  })
}

function login(req, res) {
  // implement user login
  let {username, password} = req.body;
  console.log(req.body)
  Model.findBy({username}).first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = makeNewToken(user);

      res.status(200).json({
        message: `Welcome to the app ${user.username}, enjoy the dad jokes`,
        token
      });
    } else {
      res.status(401).json({ errMessage: 'Invalid token or no token present'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

function makeNewToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
}
  return jwt.sign(payload, secrets.jwtSecret, options)
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
