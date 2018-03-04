var request = require("request");

let options = {
  uri: 'http://localhost:3000/users/login',
  method: 'POST',
  json: {
    username: "bruno",
    password: '1234'
  }
};

request(options, (err, response, body) => {

  console.log(err);
  console.log(response.statusCode);
});