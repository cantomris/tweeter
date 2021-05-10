import { Model } from '@vuex-orm/core'
import Post from './Post'
import User from './User'

export default class Comment extends Model {
  static entity = 'comments'

  static fields () {
    return {
      id: this.uid(),
      body: this.attr(null),
      post_id: this.attr(null),
      user_id: this.attr(null),
      post: this.belongsTo(Post, 'post_id'),
      user: this.belongsTo(User, 'user_id'),
      comment_id: this.uid(),
      comment_type: this.attr(null),
      commentable: this.morphTo('comment_id', 'comment_type')
    }
  }
}
