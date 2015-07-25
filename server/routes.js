var controllers = require('./controllers');
var router = require('express').Router();

router.route('/').get(function(req, res) {
  console.log('--------------------> hi');
  res.end('hello world');
}); 

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

module.exports = router;

