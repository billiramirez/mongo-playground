const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    blogPost = new BlogPost({ title: 'Js is Great', content: 'Yeah it is' });

    joe.blogPosts.push(blogPost); //this will push just the _id, this is handled by mongoo

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(()=> BlogPost.countDocuments()) //this is from mongo
      .then((count) => {
        assert(count === 0);
        done();
      })
  });

});