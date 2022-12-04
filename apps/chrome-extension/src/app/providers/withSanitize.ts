import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

export function withSanitize() {
  Vue.use(VueSanitize)
}
