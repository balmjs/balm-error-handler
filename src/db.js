import Dexie from 'dexie';

class BalmTrackingDB {
  constructor() {
    this.instance = null;

    balmTrackingDB
      .open()
      .catch((e) => console.error(`Open failed: ${e.stack}`));

    return balmTrackingDB;
  }

  createDB() {
    const balmTrackingDB = new Dexie('BalmTracking');

    balmTrackingDB.version(1).stores({
      logs: '++id, url, name, message, error',
      routes: '++id, from, to'
    });
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new BalmTrackingDB();
    }
    return this.instance;
  }
}

const db = BalmTrackingDB.getInstance();

export default db;
