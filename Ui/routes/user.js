var express = require('express')
var helpers = require('./helpers')
var router = express.Router()
const request = require('request');

router.get("/account/settings", helpers.userIsAuthenticated, function (req, res) {

  //apiden gelen bilgileri forma dolduralım.
  const options = {
    method: 'POST',
    uri: API_URL + '/user/getSettings',
    body: {
      token: req.session.user.token,
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }

    if (body.code == 200) {
      res.render('./account/settings', { user: body.user });
    }
    else if (body.code == 400) {
      res.render('./shared/404', { message: body.message, code: 400 });
    }
  })

})

router.post("/account/updateSettings", helpers.userIsAuthenticated, function (req, res) {

  if(req.body.newPassword != null && req.body.newPassword != req.body.newPasswordAgain)
  {
    res.send({ message: "Şiferler uyumsuz", code: 400 });
    return res.redirect('/user/account/settings');
  }

  const options = {
    method: 'POST',
    uri: API_URL + '/user/updateSettings',
    body: {
      token: req.session.user.token,
      currentPassword:req.body.currentPassword,
      newPassword: req.body.newPassword,
      bio: req.body.bio,
      profession: req.body.profession
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }

    if (body.code == 200) {
      res.render('./account/settings', { user: body.user });
    }
    else if (body.code == 400) {
      res.render('./shared/404', { message: body.message, code: 400 });
    }
  })

})

router.get("/account/removeSocialMedia/:socialMediaId", helpers.userIsAuthenticated, function (req, res) {

  const options = {
    method: 'POST',
    uri: API_URL + '/user/removeSocialMedia',
    body: {
      socialMediaId: req.params.socialMediaId,
      token: req.session.user.token,
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }
  })

  res.redirect('/user/account/settings');

})


router.post("/account/AddSocialMedia/", helpers.userIsAuthenticated, function (req, res) {
  const options = {
    method: 'POST',
    uri: API_URL + '/user/addSocialMedia',
    body: {
      socialMediaType: req.body.socialMediaType,
      nick: req.body.socialMediaNick,
      token: req.session.user.token,
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }
    res.redirect('/user/account/settings');
  })
})


router.get("/:username", function (req, res) {

  var username = req.params.username;

  const options = {
    method: 'POST',
    uri: API_URL + '/user/getUserProfile',
    body: {
      username: username,
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) {
      return console.error('post failed:', error);
    }
    if (body.code == 200) {
      res.render('./account/profile', { user: body.message });
    }
    else if (body.code == 400) {
      res.render('./shared/404', { message: body.message, code: 400 });
    }
  })

})

module.exports = router