<template>
  <v-container fluid>
    <h1>Upcoming Events:</h1>
     <v-layout row ii-offset wrap>

      <template v-for= "event in events">
       <v-flex sm4 lg3 event-card-container v-if="true">
          <v-card style="margin-bottom: 10px; min-height: 100%;" >
            <v-card-media :src="event.image" height="200px" @click.stop="ShowEvent(event.id)">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{event.title}}</h3>
                <div class="event-venue">
                  {{event.venues[0]}}
                </div>
                <div class="event-date">
                  {{event.when_date}}<br>{{event.when_time}}
                </div>
                <div>{{event.brief_description}}...</div>
              </div>
            </v-card-title>

            <v-card-actions style="width: 100%;">
              <v-btn flat class="orange--text" @click.stop="ShowEvent(event.id)">More Info</v-btn>
              <v-menu class="download-event-button" style="position: absolute; right: 0;" offset-y>
                <v-btn outline small color="indigo" slot="activator" style="padding:0px;">
                  <v-icon large style="font-size: 20px;">event</v-icon> ADD TO CALENDAR
                </v-btn>
                <v-list style="background:white;">
                  <v-list-tile v-for="calType in calTypes" @click="AddEventToCalendar(calType, event)">
                    <v-list-tile-title >{{ calType }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-actions>


          </v-card>
        </v-flex>
      </template>


    </v-layout>
  </v-container>
</template>

<script>

import Axios from 'axios';
import moment from 'moment'
import InfiniteAnalytics from '../helpers/infinite-analytics'

export default {
  data () {
    return {
      events: [],
      calTypes: ["iCal", "Outlook", "Google Calendar"]
    }
  },
  mounted: function(){
    var self = this;
    Axios.get('/event-listings')
      .then(function (response) {
        console.log("data from server: ",response.data.events);
        self.events = response.data.events;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    AddEventToCalendar(calType, event) {
      InfiniteAnalytics({
        event_id : event.id,
        action_type: "calendar_add",
        view_type: "card",
        calendar_type: calType,
        user_agent: navigator.userAgent
      })
      if (calType === "iCal" || calType === "Outlook") {
        // send event data to node layer to be converted into an .ics file
        window.open(`/calendar?title=${encodeURIComponent(event.title)}&description=${encodeURIComponent(event.brief_description)}&location=${encodeURIComponent(event.address)}&time_start=${encodeURIComponent(event.time_start)}&time_end=${encodeURIComponent(event.time_end)}`);
      } else if (calType === "Google Calendar") {
        var time_start_formatted = moment(event.time_start).format('YYYYMMDDTHHmmss');
        var time_end_formatted = moment(event.time_end).format('YYYYMMDDTHHmmss');

        window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${encodeURIComponent(time_start_formatted)}/${encodeURIComponent(time_end_formatted)}&details=${encodeURIComponent(event.brief_description)}&location=${encodeURIComponent(event.address)}`);
      }
    },
    ShowEvent: function(event_id){
      InfiniteAnalytics({
        event_id,
        action_type: "expand_view",
        view_type: "card",
        user_agent: navigator.userAgent
      })
      console.log(event_id);
      window.location.assign('/event/'+ event_id);
    }
  }
}

</script>

<style>

  h1{
    padding-top: 20px;
  }
  .ii-offset {
    padding-bottom: 130px;
  }

</style>
