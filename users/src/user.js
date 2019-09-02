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
  likes: Number
});

UserSchema.virtual('postCount').get(function (){
  return this.posts.length;
});

/**
 * [User description]
 * @var  {Object}
 */
const User = mongoose.model('user', UserSchema);

module.exports = User;