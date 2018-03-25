const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment')

router.use(bodyParser.json());

router.post('/', function(req, res){
  // Log user actions
  console.log(req.body);
})


module.exports = router;
