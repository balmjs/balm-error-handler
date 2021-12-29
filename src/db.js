import Dexie from 'dexie';

const db = new Dexie('BalmTrackingLog');

db.version(1).stores({
  logs: '++id, url, name, message, error'
});

db.open().catch((e) => console.error(`Open failed: ${e.stack}`));

export default db;
