<template>
  <v-app id="example-1" toolbar>
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
    <main id="content-wrapper">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      //
    }
  },
  methods: {
    OpenEventSubmitter: function(){
      this.$router.push({ path: "/submit-event" })
    },
    OpenEmailSubscribe: function() {
      window.location.assign('/subscribe-email');
    }
  }
}
</script>
