import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import Moment from 'moment';
import Vuetify from 'vuetify';

import App from './App.vue';

import Home from './pages/Home.vue';
import SubmitEvent from './pages/SubmitEvent.vue'

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path:'/submit-event',
        name: 'submit_event',
        component: SubmitEvent
      }
    ]
})

const app = new Vue({
    router: router,
    render: createEle => createEle(App),
    beforeCreate: function(){
      console.log("started app");
      // can inhale user data here
    }
}).$mount('#App')
