const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer that 2 characters'
    }, 
    required: [true, 'The name is required']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function (){
  return this.posts.length;
});

UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  // this === instance
  BlogPost.deleteMany({ _id: { $in: this.blogPosts}}) //hey, go to the BlogPost collection and remove all the records whos Ids are in this array
    .then(() => next()); //let's go to the next middleware
});

/**
 * [User description]
 * @var  {Object}
 */
const User = mongoose.model('user', UserSchema);

module.exports = User;