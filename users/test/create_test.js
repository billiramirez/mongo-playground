const assert = require('assert')
const User = require('../src/user');

describe('Creating Records', () => {
  it('saves a user', (done)=>{
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(()=> {
        // has joe been saved successfuly?
        assert(!joe.isNew); // => this checkout if it is a new record
        done();
      });
  });
});