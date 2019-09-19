const Hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig');

describe('hobbits model', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  })

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('insert()', () => {
    it('should insert hobbits into the db', async () => {
      await Hobbits.insert({ name: 'Gaffer' });

      const hobbits = await db('hobbits');
      expect(hobbits).toHaveLength(1);
    });

    it('should insert hobbits into the db', async () => {
      const [id] = await Hobbits.insert({ name: 'Gaffer' });
      const hobbit = await db('hobbits').where({ id }).first();
      expect(hobbit.name).toBe('Gaffer');
    })
  })
})