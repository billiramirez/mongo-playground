const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Driver Controller', () =>{
  it('Post to /api/drivers creates a new driver', (done) => {
    Driver.countDocuments()
      .then(count => {
        request(app)
          .post('/api/drivers')
          .send({email: 'test@test.com'})
          .end(() => {
            Driver.countDocuments()
              .then(newCount => {
                assert(count + 1 === newCount);
                done();
              });
          });
      }); 
  });


  it('Put to /api/drivers/id edit a driver', (done) =>{
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver.save()
      .then(()=> {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end(() => {
            Driver.findOne({email: 't@t.com'})
              .then((driver) => {
                assert(driver.driving === true);
                done();
              })
          })
      })
  })
})