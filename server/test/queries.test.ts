import request from 'supertest';
import { app, serverConnection } from '../index';

describe('queries', () => {
  afterAll(async () => {
    serverConnection.close();
  });

  it('should return all data', (done) => {
    request(app)
      .post('/graphql')
      .send({ query: '{ getAllDuties{  id, name } }' })
      .expect(200)
      .end((err, res) => {
        console.log('res:', res.body);
        if (err) return done(err);
        expect(res?.body?.data).toHaveProperty('getAllDuties');
        done();
      });
  });
});
