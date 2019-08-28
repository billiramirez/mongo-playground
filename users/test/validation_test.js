const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'The name is required');
  });

  it('a user name should have at least 3 character', () => {
    const user = new User({ name: 'as' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer that 2 characters')
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch(validationResult => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer that 2 characters');
        done();
      }); 
  });

});