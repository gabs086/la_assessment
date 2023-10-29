import request from 'supertest';
import { app, serverConnection } from '../index';

describe('mutations', () => {
  afterAll(async () => {
    serverConnection.close();
  });

  it('should insert new data', (done) => {
    request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ query: 'mutation { createNewDuty(name: "Unit Test"){ success, message}}' })
      .expect(200)
      .end((err, res) => {
        console.log('res:', res.body);
        if (err) return done(err);
        expect(res?.body?.data).toHaveProperty('createNewDuty');
        expect(res?.body?.data?.createNewDuty?.success).toBeTruthy();

        done();
      });
  });

  it('should update successfully', (done) => {
    request(app)
      .post('/graphql')
      .send({ query: '{ getAllDuties{  id, name } }' })
      .end((err, res) => {
        if (err) return done(err);

        const idOfLatestData = res.body.data.getAllDuties[0]?.id;

        request(app)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: `mutation { updateDuty(id:${idOfLatestData}, name: "Unit Test Updated"){ success, message}}` })
          .expect(200)
          .end((err, res) => {
            console.log('res:', res.body);
            if (err) return done(err);
            expect(res?.body?.data).toHaveProperty('updateDuty');
            expect(res?.body?.data?.updateDuty?.success).toBeTruthy();

            done();
          });
      });
  });

  it('should delete successfully', (done) => {
    request(app)
      .post('/graphql')
      .send({ query: '{ getAllDuties{  id, name } }' })
      .end((err, res) => {
        if (err) return done(err);

        const idOfLatestData = res.body.data.getAllDuties[0]?.id;

        request(app)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ query: `mutation { deleteDuty(id:${idOfLatestData}){ success, message}}` })
          .expect(200)
          .end((err, res) => {
            console.log('res:', res.body);
            if (err) return done(err);
            expect(res?.body?.data).toHaveProperty('deleteDuty');
            expect(res?.body?.data?.deleteDuty?.success).toBeTruthy();

            done();
          });
      });
  });
});
