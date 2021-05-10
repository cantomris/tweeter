import VuexORM from '@vuex-orm/core'
import Post from 'src/store/classes/Post'
import User from 'src/store/classes/User'
import Image from 'src/store/classes/Image'
import Profile from 'src/store/classes/Profile'
import Kwarg from 'src/store/classes/Kwarg'
import LikedPost from 'src/store/classes/LikedPost'
import Comment from 'src/store/classes/Comment'

const database = new VuexORM.Database()
database.register(Post)
database.register(User)
database.register(Kwarg)
database.register(Image)
database.register(Profile)
database.register(LikedPost)
database.register(Comment)

export default database
