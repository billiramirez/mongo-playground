const assert = require('assert');
const User = require('../src/user');

describe('Reading Users out of the database', () => {

  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({name: 'Alex'});
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});
    joe = new User({name: 'Joe'});

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(()=> done());

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
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
    .sort({ name: 1 }) //order by asc
    .skip(1)
    .limit(2)
      .then( users => {
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      })
  });

});



/**
 * Different ways to find a record in mongodb with mongoose
 * 
 * 1. find  => this return an array
 * 2. findOne =>  this return the first record which match the criteria
 * 
 */