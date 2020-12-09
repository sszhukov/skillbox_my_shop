import Vue from 'vue';
import App from './App.vue';

import rundomText from './randomText';
import customOutput from './customOutput';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

customOutput(rundomText.message1);
customOutput(rundomText.message2);
