<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn slower"
      leave-active-class="animated fadeOut slower"
    >
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar class="user_avatar">
            <img :src="post.user.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>{{ post.user.first_name }}</strong>
            <span class="text-grey-7"> {{ post.user.nickName }}
              <br class="lt-sm">&bull; {{ post.relativeTime }}
            </span>
          </q-item-label>
          <q-item-label class="tweet_content text-body1">{{ post.body }}
          </q-item-label>
          <q-item-label class="q-py-md" v-if="post.image">
            <img class="post_image" :src="post.image.url" alt="">
          </q-item-label>
          <div
            class="row justify-between q-mt-sm tweet_icons">
            <!-- <div
            v-for="tweetIcon in tweetOptions"
            :key="tweetIcon.icon">
              <q-btn
                clickable
                flat
                round
                color="grey"
                size="sm"
                :icon="tweetIcon.icon" />
            </div> -->
            <q-btn
              @click="openCommentModal"
              flat round
              color="grey"
              size="sm"
              icon="far fa-comment" />
            <q-btn
              flat round
              color="grey"
              size="sm"
              icon="fab fa-forumbee" />
            <q-btn
              flat round
              color="grey"
              size="sm"
              icon="fas fa-retweet" />
            <q-btn
              @click="likeTweet(post.id)"
              flat round
              :color="post.liked ? 'light-blue' : 'grey'"
              size="sm"
              :icon="post.liked ? 'fas fa-heart' : 'far fa-heart'" />
            <q-btn
              @click="getIsUser ? deleteTweet(post.id) : null"
              flat
              round
              color="grey"
              size="sm"
              :icon="getIsUser ? 'far fa-trash-alt' : 'fas fa-upload'" />
          </div>
        </q-item-section>

      </q-item>
    </transition>
    <q-separator size="1px" color="grey-4"/>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'
import Post from 'src/store/classes/Post'
import Kwarg from 'src/store/classes/Kwarg'
import UserLikedPost from 'src/store/classes/UserLikedPost'

export default {
  props: ['post'],

  methods: {
    deleteTweet (id) {
      Post.deletePost(id)
    },
    likeTweet (id) {
      // Post.likePost(id)
      const likedPost = Post.find(id)
      UserLikedPost.insert({ data: likedPost })
    },
    openCommentModal () {
      Kwarg.$toggle('isCommentModalOpen')
    }
  },
  computed: {
    getIsUser () {
      return this.authenticatedUser && this.authenticatedUser.id === this.post.user.id ? true : null
    },
    isTweetLiked: {
      get () {
        return Kwarg.$get('isTweetLiked', false)
      }
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  }
}
</script>

<style lang="sass" scoped>

.tweet_content
  white-space: pre-line

.tweet_icons
  margin-left: -8px

.user_avatar img
  object-fit: cover

.post_image
  width: 200px
  height: 200px
  border-radius: 14px
</style>
