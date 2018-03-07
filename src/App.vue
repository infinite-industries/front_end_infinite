<template>
  <v-app id="example-1" toolbar>
    <!-- <v-navigation-drawer
      persistent
      v-model="drawer"
      light
      enable-resize-watcher
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>lightbulb_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Killer Feature</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>sentiment_very_satisfied</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar class="indigo" dark fixed>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>
        <span class="hidden-sm-and-down">Infinite Industries</span>
        <span class="hidden-md-and-up">I.I</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outline class="indigo lighten-2" style="padding-left: 0px;" @click.stop="OpenEventSubmitter()">
        <span class="hidden-sm-and-down">Submit Your Event</span>
        <span class="hidden-md-and-up">SUBMIT</span>
      </v-btn>
      <v-btn outline class="indigo lighten-2" style="padding-left: 0px;" @click.stop="OpenEmailSubscribe()">
        <span class="hidden-sm-and-down">Subscribe to our Mail List</span>
        <span class="hidden-md-and-up">SUBSCRIBE</span>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
         <v-layout row wrap>

          <template v-for= "event in events">
           <v-flex sm4 lg3 event-card-container v-if="true">
              <v-card style="margin-bottom: 10px; min-height: 100%;" >
                <v-card-media :src="event.image" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{event.title}}</h3>
                    <div class="event-venue">
                      {{event.venues[0]}}
                    </div>
                    <div class="event-date" v-html="event.when"></div>
                    <div>{{event.brief_description}}...</div>
                  </div>
                </v-card-title>

                <v-card-actions style="width: 100%;">
                  <v-btn flat class="orange--text" @click.stop="ShowEvent(event.id)">More Info</v-btn>
                  <v-menu class="download-event-button" style="position: absolute; right: 0;" offset-y>
                    <v-btn fab small color="white" slot="activator" style="padding:0px;">
                      <v-icon large style="font-size: 28px;">event</v-icon>
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
    </main>
  </v-app>
</template>

<script>

import Axios from 'axios';
import moment from 'moment'


export default {
  data () {
    return {
      events: [],
      drawer: false,
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
      console.log(event_id);
      window.location.assign('/event/'+ event_id);
    },
    OpenEventSubmitter: function(){
      window.location.assign('https://event-add.glitch.me/');
    },
    OpenEmailSubscribe: function() {
      window.location.assign('/subscribe-email');
    }
  }
}
</script>
