const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const slack = require('./utils/slackNotify');
const { makeAPICall } = require('./utils/requestHelper');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.get('/', (req, res) => {

  // TODO: instead of manually returning a list of venues, pull from our database
  res.json({ status: "success", venues: [
     { id: 'd0858cc0-0478-11e8-808e-07b6d0fe568b',
       name: 'Institute 193',
       slug: 'institute_193',
       address: '193 N Limestone, Lexington, KY 40507',
       g_map_link: 'https://goo.gl/maps/PXBsHGVauTB2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'd9107b10-0479-11e8-808e-07b6d0fe568b',
       name: 'The Burl',
       slug: 'the_burl',
       address: '375 Thompson Rd, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/MerUrvdgk9u',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'e0f0ee00-0479-11e8-808e-07b6d0fe568b',
       name: 'Bolivar Art Gallery - UK School of Art',
       slug: 'bolivar_art',
       address: '236 Bolivar St, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/cFTbFbb7TmS2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'f1c12100-0479-11e8-808e-07b6d0fe568b',
       name: 'Cosmic Charlie\'s',
       slug: 'cosmic',
       address: '723 National Ave, Lexington, KY 40502',
       g_map_link: 'https://goo.gl/maps/DRBPSQwjpYu',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'fca780f0-0479-11e8-808e-07b6d0fe568b',
       name: 'Best Friend Bar',
       slug: 'best_friend',
       address: '500 Euclid Ave, Lexington, KY 40502',
       g_map_link: 'https://goo.gl/maps/1A6vVwVXE432',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '0d63ddd0-047a-11e8-808e-07b6d0fe568b',
       name: 'Whiskey Bear',
       slug: 'whiskey_bear',
       address: '119 Marion, Suite 170, Lexington, Kentucky',
       g_map_link: 'https://goo.gl/maps/7qSyqTGRyZU2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '181af060-047a-11e8-808e-07b6d0fe568b',
       name: '21C Lexington',
       slug: '21c_lex',
       address: '167 W Main St, Lexington, KY 40507',
       g_map_link: 'https://goo.gl/maps/y53p9xLcNcU2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '22716c60-047a-11e8-808e-07b6d0fe568b',
       name: 'Lexington Art League',
       slug: 'lal',
       address: '209 Castlewood Dr, Lexington, Kentucky 40505',
       g_map_link: 'https://goo.gl/maps/PmtR8kAQPRM2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '29d471f0-047a-11e8-808e-07b6d0fe568b',
       name: 'Singletary Center for the Arts',
       slug: 'singletary',
       address: '405 Rose St, Lexington, Kentucky 40508',
       g_map_link: 'https://goo.gl/maps/uLQTd23sBsu',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '30c331e0-047a-11e8-808e-07b6d0fe568b',
       name: 'The Green Lantern Bar',
       slug: 'green_lantern',
       address: '497 W 3rd St, Lexington, Kentucky 40508',
       g_map_link: 'https://goo.gl/maps/7qVeS821NtR2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '446e9860-047a-11e8-808e-07b6d0fe568b',
       name: 'Farish Theater',
       slug: 'farrish',
       address: '140 E Main St, Lexington, Kentucky 40507',
       g_map_link: 'https://goo.gl/maps/ewNPYZsX95L2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '4a06a1f0-047a-11e8-808e-07b6d0fe568b',
       name: 'Brier Books',
       slug: 'brier_books',
       address: '319 S Ashland Ave, Lexington, KY 40502',
       g_map_link: 'https://goo.gl/maps/ebYWdVHj27H2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '4f5c7260-047a-11e8-808e-07b6d0fe568b',
       name: 'Lyric Theatre & Cultural Arts Center',
       slug: 'lyric_theater',
       address: '300 E Third St, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/onMCXLbESuq',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '54348750-047a-11e8-808e-07b6d0fe568b',
       name: 'Morlan Gallery',
       slug: 'morland',
       address: '300 N Broadway, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/sCZ4P8bUkNw',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '44348750-047a-11e8-808e-07b6d0fe568b',
       name: 'Transylvania University Library',
       slug: 'transy',
       address: '300 N Broadway, Lexington, Kentucky 40508',
       g_map_link: 'https://goo.gl/maps/abNS5ay9MRJ2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '34348750-047a-11e8-808e-07b6d0fe568b',
       name: 'The Lexington Center',
       slug: 'lexcenter',
       address: '430 W Vine St, Lexington, KY 40507',
       g_map_link: 'https://goo.gl/maps/xPRe8nzEdEK2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'bc6852cc-7730-402e-a343-72c3bfb1e61a',
       name: 'Pivot Brewing',
       slug: 'pivot',
       address: '1400 Delaware Ave, Lexington, KY 40505',
       g_map_link: 'https://goo.gl/maps/XBATzcDxLro',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: 'babb8118-ad90-4cbb-aeaa-361ace35d479',
       name: 'The Plantory',
       slug: 'plantory',
       address: '501 W 6th St Suite 250, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/8S81XyKx57C2',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '197d2c60-6b9a-412f-9cfc-468e25a5c9cc',
       name: 'The Parachute Factory',
       slug: 'theparachutefactory',
       address: '720 Bryan Ave. Lexington KY',
       g_map_link: 'https://goo.gl/maps/3BFZuB9ffa92',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '89cd986b-382b-4bf3-95b4-9b2e42db335b',
       name: 'UK Art Museum',
       slug: 'ukartmueum',
       address: '405 Rose St, Lexington, Kentucky 40508',
       g_map_link: 'https://goo.gl/maps/uLQTd23sBsu',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '8d4df28f-78bc-4328-afa0-cb7064e276e6',
       name: 'Al\'s Bar',
       slug: 'alsbar',
       address: '601 N Limestone, Lexington, KY 40508',
       g_map_link: 'https://goo.gl/maps/naMxQHVzL2t',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' },
     { id: '4bf24a00-4739-4efc-9b35-07e3d6a1629a',
       name: 'Kentucky for Kentucky',
       slug: 'kentuckyforkentucky',
       address: '720 Bryan Ave, Lexington, KY 40505',
       g_map_link: 'https://goo.gl/maps/XspXNU4Pyiv',
       createdAt: '2018-03-23T01:08:28.924Z',
       updatedAt: '2018-03-23T01:08:28.924Z' }
      ]});

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
