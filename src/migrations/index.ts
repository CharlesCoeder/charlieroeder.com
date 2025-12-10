import * as migration_20251009_155501_initial from './20251009_155501_initial';
import * as migration_20251031_021340 from './20251031_021340';
import * as migration_20251117_233304 from './20251117_233304';
import * as migration_20251211_235146 from './20251211_235146';

export const migrations = [
  {
    up: migration_20251009_155501_initial.up,
    down: migration_20251009_155501_initial.down,
    name: '20251009_155501_initial',
  },
  {
    up: migration_20251031_021340.up,
    down: migration_20251031_021340.down,
    name: '20251031_021340',
  },
  {
    up: migration_20251117_233304.up,
    down: migration_20251117_233304.down,
    name: '20251117_233304',
  },
  {
    up: migration_20251211_235146.up,
    down: migration_20251211_235146.down,
    name: '20251211_235146'
  },
];
