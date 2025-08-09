const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app-test');
const KeyModel = require('./Models/keyModel');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_DB_URI+process.env.DB_TEST_NAME);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await KeyModel.deleteMany({});
});

describe('POST /object', () => {
  it('should insert a key-value and return status ok', async () => {
    const res = await request(app)
      .post('/object')
      .send({ mykey: "value1" })
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.key).toBe('mykey');
    expect(res.body.value).toBe('value1');
    expect(typeof res.body.timestamp).toBe('number');
  });

  it('should reject if more than one key sent', async () => {
    const res = await request(app)
      .post('/object')
      .send({ k1: 'v1', k2: 'v2' })
      .expect(400);

    expect(res.body.status).toBe('err');
    expect(res.body.msg).toMatch(/Only one key/);
  });
});

describe('GET /object/:key', () => {
  beforeEach(async () => {
    await KeyModel.create({ key: 'mykey', value: 'value1', timestamp: 1754496000 });
    await KeyModel.create({ key: 'mykey', value: 'value2', timestamp: 1754582400 });
  });

  it('should get latest value for a key', async () => {
    const res = await request(app)
      .get('/object/mykey')
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.value).toBe('value2');
  });

  it('should get value at or before given timestamp', async () => {
    const res = await request(app)
      .get('/object/mykey')
      .query({ timestamp: 1754539200 })
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.value).toBe('value1');
  });

  it('should return msg if key not found', async () => {
    const res = await request(app)
      .get('/object/notfound')
      .expect(200);

    expect(res.body.status).toBe('ok');
    expect(res.body.msg).toMatch(/not found/);
  });

  it('should error if timestamp is not a number', async () => {
    const res = await request(app)
      .get('/object/mykey')
      .query({ timestamp: 'notANumber' })
      .expect(400);

    expect(res.body.status).toBe('err');
    expect(res.body.msg).toMatch(/timestamp not a number/);
  });
});
