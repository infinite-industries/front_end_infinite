<template>
  <div>
    <!-- Notifications -->
    <ii-notifications />

    <!-- Toolbar and Nav -->
    <ii-toolbar />

    <div id="ii-container">
      <!-- Content -->
      <router-view></router-view>
    </div>
    <!-- PopUps and Modals -->
      <!-- Regular Old Modal -->
      <ii-modal />
      <ii-subscribe />
      <!-- iPhone-specific save button to desktop -->
      <!-- <ii-iphone-save-button /> -->
  </div>
</template>

<script>

import Toolbar from './components/ii-toolbar.vue'
import Notifications from './components/ii-notifications.vue'
import IphoneSaveButton from './components/ii-iphone-save-button.vue'
import Subscribe from './components/ii-subscribe.vue'
import Modal from './components/ii-modal.vue'
import 'babel-polyfill';

//import EventsFromStore from './helpers/ComponentEventBus.js'

//import axios from 'axios'
import { isLoggedIn, setAxiosConfig } from './helpers/Auth'

export default {
  data () {
    return {
      // notification: {
      //   visible: false,
      //   type: '',
      //   message: '',
      //   timeout: false
      // }
    }
  },
  // setting access token in created, so that it comes before mounted hooks in child components
  created: function() {
    if (isLoggedIn()) {
      this.$store.dispatch('Login');
      setAxiosConfig();
    }
  },
  mounted: function(){

    //const _self = this

    // Inhale mock user data
    this.$store.dispatch('LoadAllUserData')
    this.$store.dispatch('LoadAllVenueData')

    console.log(this.$store.getters.GetLoadingStatus)

    // // Clean up localForage if admin pannel deletes an event
    // EventsFromStore.$on('CALENDAR_EVENT_DELETED', function(data){
    //   console.log("Delete the Event ", data.id);
    // })
    //
    // // Clean up localForage if admin verifies the event
    // EventsFromStore.$on('CALENDAR_EVENT_VERIFIED', function(data){
    //   console.log("EVENT CENTRAL cleanup --- Remove Verified Event", data.id);
    // })

  },
  methods: {
    OpenEventSubmitter: function(){
      window.location.assign('https://event-add.glitch.me/');
    },
    OpenEmailSubscribe: function() {
      window.location.assign('/subscribe-email');
    },
    RouteTo: function(route_to_page){
      this.$router.push({ path: route_to_page })
    },
    // ConfirmAction: function(action_confirmation_message){
    //   // DISPATCH vuex
    //   // EventBus.$emit(action_confirmation_message);
    //   // this.notification = {
    //   //   visible: true,
    //   //   type: 'info',
    //   //   message: action_confirmation_message
    //   // }
    // }

  },
  components: {
    'ii-toolbar': Toolbar,
    'ii-notifications': Notifications,
    'ii-iphone-save-button': IphoneSaveButton,
    'ii-modal': Modal,
    'ii-subscribe': Subscribe
  }
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=EB+Garamond|Open+Sans:400,600,600i,700');

  body {
    background-color: black;
  }

  #app {

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  #ii-container {
    padding-top: 90px;
  }

  /* h1{
    font-family: 'EB Garamond', serif;
    font-size: 1.9em;
    text-decoration: underline;
    color: white;
  } */

  .admin-page {
    background: white;
    color: black;
    border-radius: 10px;
  }

  .info-page {
    background: white;
    color: black;
    border-radius: 10px;

    width: 85%;
    max-width: 900px;
  }

  @media only screen and (min-width: 993px) {
    .info-page {
      width: 70%;
    }
  }

  h1, h2, h3 {
    font-family: "Open Sans", sans-serif;
    letter-spacing: .02em;

  }

  h1{
    font-size: 1.9em;
    font-weight: bold;
    margin-bottom: 0.7em;
  }

  h2, h3{
    font-size: 1.5em;
    font-weight: 700;
    margin-top: 1.5em;
    margin-bottom: .5em;
  }


  .info-page p {
    font-family: "EB Garamond";
    font-size: 1.25em;
  }

</style>
