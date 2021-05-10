import { Model } from '@vuex-orm/core'
import Image from './Image'
import User from './User'
import { formatDistance } from 'date-fns'
import Comment from './Comment'
import { tr } from 'date-fns/locale'

// import Kwarg from './Kwarg'

export default class Post extends Model {
  static entity = 'posts'

  get relativeTime () {
    // const locales = { en, tr }
    return formatDistance(this.time_stamp, Date.now(), {
      locale: tr
    })
  }
  // static mutators () {
  //   return {
  //     time_stamp (value) {
  //       return formatDistance(value, Date.now())
  //     }
  //   }
  // }

  static deletePost (id) {
    Post.delete(id)
  }

  static likePost (id) {
    this.liked = !this.liked
    console.log(this.liked)
  }

  get isPostLiked () {
    return this.liked
  }

  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(null),
      title: this.attr(null),
      body: this.attr(null),
      time_stamp: this.attr(null),
      liked: this.attr(null),
      // relations
      user: this.belongsTo(User, 'user_id'),
      comments: this.hasMany(Comment, 'post_id'),
      image: this.morphOne(Image, 'imageable_id', 'imageable_type')
    }
  }
}
