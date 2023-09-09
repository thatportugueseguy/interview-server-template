import request from 'supertest';

import app from '../app';
import { apiPrefix } from '../constants';

describe('Users route', () => {
  it('should return 200 from the GET endpoint', async () => {
    await request(app).get(`/${apiPrefix}/users`).expect(200);
  });

  it('Should return a 201 from the POST endpoint', async () => {
    await request(app)
      .post(`/${apiPrefix}/users`)
      .set('User-Agent', 'cool stuff')
      .send({ item: 'some content' })
      .expect(201);
  });
});
