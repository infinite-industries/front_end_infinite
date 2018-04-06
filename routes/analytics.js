const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { getDBForAnalytics } = require(__dirname + '/utils/utils-analytics.js')

router.use(bodyParser.json());
router.post('/', async function(req, res) {
  // just send success because the client does not care
  res.status(200).send({ status: 'success' })

  console.log(req.body)

  try {
    const db = await getDBForAnalytics()
    await db.get(`
      INSERT INTO analytics
        (time_stamp, event_id, calendar_type, user_agent, action_type, view_type)
        VALUES (
          '${new Date(Date.now()).toUTCString()}',
          '${req.body.event_id || ''}',
          '${req.body.calendar_type || ''}',
          '${req.body.user_agent || ''}',
          '${req.body.action_type || ''}',
          '${req.body.view_type || '' }')  
    `)
  } catch(ex) {
    console.warn('error writing to analytics: ' + ex)
  }
})


module.exports = router;
