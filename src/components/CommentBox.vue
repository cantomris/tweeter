<template>
  <div>
    <q-dialog
      v-model="isCommentModalOpen"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ post }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>
          <div v-if="authenticatedUser" class="q-py-lg q-px-md row items-end q-col-gutter-md">
            <div class="col">
              <q-input
                autogrow
                bottom-slots
                v-model="makeComment"
                :placeholder="$i18n.t('Whats happening?')"
                counter
                maxlength="255">
                <template v-slot:before>
                  <q-avatar size="md">
                    <img :src="authenticatedUser.avatar">
                  </q-avatar>
                </template>

              </q-input>
            </div>
            <div class="col col-shrink q-mb-lg">
              <q-btn
                @click="postComment"
                :disable="!makeComment"
                no-caps
                rounded
                color="primary"
                :label="$i18n.t('Send')"/>
            </div>

          </div>
        <!-- <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Kwarg from 'src/store/classes/Kwarg'
// import Post from 'src/store/classes/Post'
export default {
  props: ['post'],

  data () {
    return {
      makeComment: ''
    }
  },
  methods: {
    postComment () {
      console.log(this.post.id)
    }
  },
  computed: {
    isCommentModalOpen: {
      get () {
        return Kwarg.$get('isCommentModalOpen', true)
      },
      set (isCommentModalOpen) {
        Kwarg.$set('isCommentModalOpen', isCommentModalOpen)
      }
    }
  }
}
</script>
