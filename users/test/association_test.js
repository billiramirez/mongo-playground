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

  it.only('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Js is Great');
        done();
      })
  });
});