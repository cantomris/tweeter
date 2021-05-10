<template>
  <q-drawer show-if-above v-model="right" side="right" bordered>
    <q-input class="q-mt-sm q-mx-md" dense rounded outlined :label="$i18n.t('Search')">
      <template v-slot:prepend>
        <q-icon name="search" size="sm"/>
      </template>
    </q-input>
<!-- <pre>
  {{currentUser}}
</pre> -->
<!-- POSTS here -->
    <q-toolbar-title class="text-weight-bold q-mt-md">
      {{ $i18n.t('Your recent posts') }}
    </q-toolbar-title>
  <div>

    <q-list padding separator v-for="post of currentUser[0].posts" :key="post.id">
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label class="text-weight-bold" >
            {{ post.title }}
          </q-item-label>
          <q-item-label caption lines="2">
            {{ post.body }}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>
            {{ post.relativeTime }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>

    <q-toolbar-title class="text-weight-bold q-mt-md">
      {{ $i18n.t('Trends for you') }}
    </q-toolbar-title>
    <q-list padding separator v-for="post of posts" :key="post.id">
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label class="text-grey" overline>Education</q-item-label>
          <q-item-label class="text-weight-bold" >
            {{ post.title }}
          </q-item-label>
          <q-item-label caption lines="2">
            {{ post.body }}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>
            {{ post.relativeTime }}
          </q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
// import { formatDistance } from 'date-fns'
import Post from 'src/store/classes/Post'
import User from 'src/store/classes/User'

export default {
  data () {
    return {
      right: false
    }
  },
  computed: {
    posts () {
      return Post.query()
        .orderBy('time_stamp', 'asc')
        .get()
    },
    currentUser () {
      return User.query()
        .whereId(this.authenticatedUser.$id)
        .with('posts')
        .with('user_liked_posts')
        // .with('LikedPosts')
        .get()
    }
  }
}
</script>
