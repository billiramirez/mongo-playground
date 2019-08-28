const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of the database', () => {

  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() =>  done())
  });

  it('Find all users with a name of Joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done(); 
      })
  });

  it('Find a user with a particular ID', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  })
});



/**
 * Different ways to find a record in mongodb with mongoose
 * 
 * 1. find  => this return an array
 * 2. findOne =>  this return the first record which match the criteria
 * 
 */