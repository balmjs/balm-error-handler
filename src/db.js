import Dexie from 'dexie';

const DB_NAME = 'BalmTracking';

let instance;

class BalmTrackingDatabase {
  constructor() {
    return this.createDatabase();
  }

  createDatabase() {
    const db = new Dexie(DB_NAME);

    db.version(1).stores({
      logs: '++id, url, name, message, error',
      routes: '++id, from, to'
    });

    db.open().catch((error) =>
      console.error(`Open failed: ${error.stack || error}`)
    );

    return db;
  }

  static getInstance() {
    if (instance === undefined) {
      instance = new BalmTrackingDatabase();
    }
    return instance;
  }
}

const db = BalmTrackingDatabase.getInstance();

export default db;
