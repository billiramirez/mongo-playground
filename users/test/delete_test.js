const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndDelete({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then( user => {
        assert(user === null);
        done();
      });
  })
});



/**
 * Different ways to delete a record in mongodb with mongoose
 * 
 * 1. remove
 * 2. deleteOne
 * 3. findOneAndDelete
 * 4. findByIdAndDelete
 * 
 */