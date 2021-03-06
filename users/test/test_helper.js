const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //This is required since mongoose is waiting you use the promise self-handle system, so let's USE the ES6 promisses.

// Let's try the connection to the databae instance users_test
before((done) => {  //before is executed once for all your test
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true, useFindAndModify: false });
  mongoose.connection
    .once('open', () => {done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });
})

beforeEach((done) => { //before each works per each test
  const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        })
      })
    })
})