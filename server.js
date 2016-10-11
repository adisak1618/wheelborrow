var connect = require('connect');
var serveStatic = require('serve-static');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
mongoose.connect('mongodb://localhost/wheelborrow');
var Rent = new Schema({
  name: { type: String },
  email: { type: String }
});
var User = new Schema({
  name: { type: String },
  email: { type: String }
});
var MvpUser = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email_address: { type: String },
  interest: { type: String },
  other: { type: String },
  postal_code: { type: String },
  country: { type: String }
});


var UserModel = mongoose.model('User', User);
var RentModel = mongoose.model('RentUser', Rent);
var Mvp2User = mongoose.model('Mvpuser2', MvpUser);
app.post('/submitborrow', function (req, res) {
  UserModel.create({'email': req.body.email}, function (err) {
    console.log('success');
    res.send('User success');
  });
});

app.post('/submitrent', function (req, res) {
  RentModel.create({'name': req.body.name,'email': req.body.email}, function (err) {
    console.log('success');
    res.send('Rent success');
  });
});

app.post('/submitmvp2', function (req, res) {
  console.log(req.body.first_name);
  console.log(req.body.last_name);
  console.log(req.body.email_address);
  console.log(req.body.interest);
  console.log(req.body.other);
  var data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    interest: req.body.interest,
    other: req.body.other,
    postal_code: req.body.postal_code,
    country: (req.body.country ? req.body.country: '')
  };
  validate = true;
  for (var property in data) {
      if (data.hasOwnProperty(property)) {
          // do stuff
          if(data[property] === undefined || data[property] === null) {
            validate = false;
          }
      }
  }
  if (validate) {
    Mvp2User.create(data, function (err) {
      console.log('success');
      res.send('Mvp2 user success');
    });
  } else {
    res.send('Error');
  }

});

app.get('/userlist', function (req, res) {
  var text = "<div><h1>list of user</h1>";
  RentModel.find({}, function (err, data) {
    data.every(function (item, index) {
      text += '<p> '+(index+1)+'.)&nbsp;<strong>name: </strong>'+item.name+'&nbsp;&nbsp; <strong>email:</strong> '+item.email+'</p> '
      return true;
    });
    UserModel.find({}, function (err, userdata) {
      text += "<h1>list of user who want to earn more money</h1>";
      userdata.every(function (item, index) {
        text += '<p> '+(index+1)+'.)&nbsp;<strong>email:</strong> '+item.email+'</p> ';
        return true;
      });
      text+= '</div>';
      res.send(text);
    })
  })
});
// connect().use(serveStatic(__dirname)).listen(80, function(){
//     console.log('Server running on 80...');
// });

app.use('/', express.static(__dirname + '/'));
app.use('/ph', express.static(__dirname + '/ph.html'));
app.use('/th', express.static(__dirname + '/th.html'));
app.use('/howitworks', express.static(__dirname + '/howitworks.html'));
app.use('/signup', express.static(__dirname + '/signup.html'));
app.use('/th/howitworks', express.static(__dirname + '/howitworks-th.html'));
app.use('/th/signup', express.static(__dirname + '/signup-th.html'));

app.listen('80', function() {
    console.log('Node app is running on port 80')
})
