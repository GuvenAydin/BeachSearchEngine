var express = require('express')
var router = express.Router()
const request = require('request');
var helpers = require('./helpers')


router.get('/register',helpers.sessionChecker, function (req, res) {
  res.render('./account/register', { message: null });
})

router.post('/register', function (req, res) {
  let uname = req.body.username;
  let upass = req.body.upass;
  let uemail = req.body.uemail;

  const options = {
    method: 'POST',
    uri: API_URL + '/auth/register',
    body: {
      username: uname,
      upass: upass,
      uemail: uemail
    },
    json: true
  }
  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }
    if (body.code === 200) {
      req.session.user = body.user; //session add user
      res.redirect('/');
    }
    else if (body.code == 400) {
      res.render('./account/register', { message: body.message, code: 400 });
    }
  })
})


//LOGİN
router.get('/login',helpers.sessionChecker, function (req, res) {
  res.render('./account/login', { message: null });
})

router.post('/login', function (req, res) {
  var usernameOrEmail = req.body.usernameOrEmail;
  var upass = req.body.upass;

  const options = {
    method: 'POST',
    uri: API_URL + '/auth/login',
    body: {
      usernameOrEmail: usernameOrEmail,
      upass: upass,
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }
    if (body.code === 200) {

      req.session.user = body.user; //session add user
      res.redirect('/');
    }
    else if (body.code == 400) {
      res.render('./account/login', { code: body.code, message: body.message, });
    }
  })
})



router.get('/logout', function (req, res) {
  if (req.session.user == null) {
    return res.send({ code: 400, message: "Token not found" })
  }

  removeUserToken(req.session.user.token);
  req.app.locals.localUser = 'undefined';
  req.session.destroy();
  res.clearCookie('user_sid');        
  res.redirect('/');
})


async function removeUserToken(token) {
  try {

    const options = {
      method: 'POST',
      uri: API_URL + '/auth/logout',
      body: {
        token: token,
      },
      json: true
    }

    request(options, function (error, response, body) {
      if (error) {
        return console.error('post failed:', error);
      }
      if (body.code === 200) {

      }
      else if (body.code == 400) {

      }
    })

  } catch (err) {
    return console.error('post failed:', err);
  }
}


module.exports = router