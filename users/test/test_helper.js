const mongoose = require('mongoose');
// Let's try the connection to the databae instance users_test
mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('good to go'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next text!
    done();
  });
})