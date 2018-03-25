import Axios from 'axios';

export default function (event_obj) {
  var date = new Date()

  event_obj.date = date

  Axios.post('/analytics', event_obj)
  .then(function (_response) { /* ignore response for now */})
  .catch(function (error) {
    console.log(error);
  });

}
