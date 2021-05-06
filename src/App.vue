<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

import insertUsers from 'src/assets/insertUsers'
import authenticatedUserMixin from 'src/mixins/auth/authenticatedUserMixin'

export default {
  name: 'App',
  mixins: {
    authenticatedUserMixin
  },
  mounted () {
    insertUsers()
  }
}
</script>
