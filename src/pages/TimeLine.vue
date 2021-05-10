<template>
  <q-page>
    <div v-if="authenticatedUser" class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          autogrow
          bottom-slots
          v-model="newTweet"
          :placeholder="$i18n.t('Whats happening?')"
          counter
          maxlength="280">
          <template v-slot:before>
            <q-avatar class="user_avatar" size="lg">
              <img :src="authenticatedUser.avatar">
            </q-avatar>
          </template>

        </q-input>
      </div>
      <div class="col col-shrink q-mb-lg">
        <q-btn
          @click="addNewTweet"
          :disable="!newTweet"
          no-caps
          rounded
          color="primary"
          :label="$i18n.t('Send')"/>
      </div>

    </div>

    <q-separator v-if="authenticatedUser" class="divider" size="10px" color="grey-"/>

    <q-list
      v-for="post in posts"
      :key="post.time_stamp"
      separator>

      <Tweet :post="post"/>
    </q-list>
  </q-page>
</template>

<script>
import Post from 'src/store/classes/Post'
import Tweet from 'src/components/Tweet'

export default {
  name: 'TimeLine',
  components: {
    Tweet
  },

  data () {
    return {
      newTweet: ''
    }
  },

  computed: {
    posts () {
      return Post.query()
        .orderBy('time_stamp', 'desc')
        .withAllRecursive()
        .get()
    }
  },

  methods: {
    addNewTweet () {
      Post.insert({
        data: {
          user: this.authenticatedUser,
          body: this.newTweet,
          time_stamp: Date.now()
        }
      })
      // return Post
      this.newTweet = null
    }
  }
}
</script>

<style lang="sass" scoped>
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.user_avatar img
  object-fit: cover
</style>
