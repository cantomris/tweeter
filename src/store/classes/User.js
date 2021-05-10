import { Model } from '@vuex-orm/core'
import Image from './Image'
import Post from './Post'
// import LikedPost from './LikedPost'
import Kwarg from './Kwarg'
import bus from 'src/bus/index'
import Comment from './Comment'

export default class User extends Model {
  static entity = 'users'
  static primaryKey = 'email'

  get nickName () {
    return `@${this.first_name}${this.last_name}`.toLowerCase()
  }

  static fields () {
    return {
      id: this.uid(),
      first_name: this.attr(null),
      last_name: this.attr(null),
      avatar: this.attr(null),
      email: this.attr(null),
      password: this.attr(null),
      post_id: this.attr([]),
      // relations
      posts: this.hasMany(Post, 'user_id'),
      comments: this.hasMany(Comment, 'user_id'),
      image: this.morphOne(Image, 'imageable_id', 'imageable_type')
    }
  }

  static async loginWithCredentials (credentials) {
    const user = this.find(credentials.email)
    if (!user) {
      alert('Not user')
    }
    if (user.password !== credentials.password) {
      return false
    }
    await Kwarg.$set('auth.user.email', user.email)
    bus.$emit('login', this.getAuthenticated())
    return true
  }

  static async signupWithCredentials (credentials) {
    User.insert({
      data: {
        first_name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        avatar: credentials.avatar
      }
    })
    await Kwarg.$set('auth.user.email', credentials.email)
    bus.$emit('login', this.getAuthenticated())
    return true
  }

  static getAuthenticated () {
    const email = Kwarg.$get('auth.user.email')
    const user = this.find(email)
    return user
  }

  static async logout () {
    await Kwarg.delete('auth.user.email')
    bus.$emit('logout')
    return true
  }
}
