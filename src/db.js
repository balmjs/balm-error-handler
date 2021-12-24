import Dexie from 'dexie';

const db = new Dexie('ErrorLog');

db.version(1).stores({
  logs: '++id, name, message'
});
