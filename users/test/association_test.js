const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    blogPost = new BlogPost({ title: 'Js is Great', content: 'Yeah it is' });
    comment = new Comment({ content: 'Congrats of a new test' });

    joe.blogPosts.push(blogPost); //this will push just the _id, this is handled by mongoo
    blogPost.comments.push(comment); //this will push just the _id, this is handled by mongoo
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Js is Great');
        done();
      })
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then( user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'Js is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats of a new test');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  });
});