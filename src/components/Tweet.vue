<template>
  <div>
    <!-- <CommentBox :post="post"/> -->
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
              icon="far fa-comment" > <p>{{ post.comments.length }}</p> </q-btn>
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
              :color="post.likes ? 'light-blue' : 'grey'"
              size="sm"
              :icon="post.likes ? 'fas fa-heart' : 'far fa-heart'" /> <!-- <p>{{ post.likes.length }}</p> </q-btn> -->
            <q-btn
              @click="isPostBelongsToCurrentUser ? deleteTweet(post.id) : null"
              flat
              round
              color="grey"
              size="sm"
              :icon="isPostBelongsToCurrentUser ? 'far fa-trash-alt' : 'fas fa-upload'" />
          </div>
        </q-item-section>

      </q-item>
    </transition>
    <div class="comments" v-if="authenticatedUser">
      <q-item class="q-py-sm q-px-lg" v-for="comment in post.comments" :key="comment.id">
        <q-item-section avatar top>
            <q-avatar class="user_avatar" size="md">
              <img :src="comment.user.avatar">
            </q-avatar>
          </q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>{{ comment.user.first_name }}</strong>
            <span class="text-grey-7"> {{ comment.user.nickName }}
              <br> {{comment.body}}
            </span>
          </q-item-label>

      </q-item>
      <div class="row">
        <div class="col">
          <q-input
            autogrow
            bottom-slots
            v-model="newComment">
            <template v-slot:before>
              <q-avatar class="user_avatar" size="md">
                <img :src="authenticatedUser.avatar">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink q-mt-md">
          <q-btn
            @click="submitComment"
            :disable="!newComment"
            no-caps
            rounded
            color="primary"
            :label="$i18n.t('Send')"/>
        </div>
      </div>
    </div>
    <q-separator size="1px" color="grey-4"/>
  </div>
</template>

<script>
import Post from 'src/store/classes/Post'
import Kwarg from 'src/store/classes/Kwarg'
import Comment from 'src/store/classes/Comment'
// import CommentBox from 'src/components/CommentBox'

export default {
  props: ['post'],
  // components: {
  //   CommentBox
  // },
  data () {
    return {
      newComment: ''
    }
  },

  methods: {
    deleteTweet (id) {
      Post.deletePost(id)
    },
    likeTweet (id) {
      // Post.likePost(id)
      const LikedPost = Post.find(id)
      LikedPost.insert({ data: LikedPost })
      console.log(this.$i18n.locale)
    },
    openCommentModal () {
      Kwarg.$toggle('isCommentModalOpen')
    },
    submitComment () {
      console.log(this.newComment, this.post.id)
      Comment.insert({
        data: {
          user: this.authenticatedUser,
          post_id: this.post.id,
          body: this.newComment
        }
      })
      this.newComment = ''
    }
  },
  computed: {
    isPostBelongsToCurrentUser () {
      return this.authenticatedUser && this.authenticatedUser.id === this.post.user.id ? true : null
    },
    isTweetLiked: {
      get () {
        return Kwarg.$get('isTweetLiked', false)
      }
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
.comments
  border: 1px solid rgba(0, 0, 0, 0.14)
  border-radius: 14px
  padding: 5px 10px
  margin: 10px
</style>
