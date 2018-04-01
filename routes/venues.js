const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const slack = require('./utils/slackNotify');
const { makeAPICall } = require('./utils/requestHelper');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.load();

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.get('/', (req, res) => {

  // TODO: instead of manually returning a list of venues, pull from our database
  axios.get(process.env.SITE_URL + '/venue-list.json').then( response => {
    res.json({ status:"success", venues: response.data});
  }).catch( err => {
    console.log(err);
    res.status(500).json({"error": "error retreiving venues: " + err})
  })

  // makeAPICall('get', 'venues', {}, process.env.API_KEY, (err, apiResp) => {
  //   if (err) {
  //     console.warn(err);
  //     res.status(500).json({ status: 'error getting venues'});
  //   } else {
  //     res.json(apiResp.data);
  //   }
  // })
});

router.post('/submit-new', (req, res) => {
  let new_venue = req.body;
  new_venue.approved = false;
  console.log(new_venue);
  slack.Notify("test", JSON.stringify(new_venue));
  res.json({"status":"success"});
})

module.exports = router;
