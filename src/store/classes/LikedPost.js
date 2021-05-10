import { Model } from '@vuex-orm/core'
import Post from './Post'
import User from './User'

export default class LikedPost extends Model {
  static entity = 'likedposts'

  static fields () {
    return {
      id: this.uid(),
      user_id: this.uid(),
      post_id: this.uid(),
      user: this.belongsTo(User, 'user_id'),
      post: this.belongsTo(Post, 'post_id')
    }
  }
}
