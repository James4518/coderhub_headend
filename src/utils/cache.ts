type ItemKey =
  | 'ACCESS_TOKEN'
  | 'IS_ADMIN'
  | 'TABS_HISTORY'
  | 'THEME'
  | 'LANGUAGE'
  | 'SETTING'
  | 'IS_PLUGIN_INSTALLING'
  | 'REFRESH_TOKEN'
  | 'USERNAME'
  | 'PASSWORD';

export type StorageType = 'session' | 'local';

const storageHelper = {
  setItem: (
    key: ItemKey,
    data: unknown,
    type: StorageType = 'session'
  ): void => {
    if (typeof window === 'undefined') return;
    const storage =
      type === 'session' ? window.sessionStorage : window.localStorage;
    if (storage) {
      try {
        storage.setItem(key, JSON.stringify(data));
      } catch (error) {
        console.error(`Failed to store item "${key}":`, error);
      }
    }
  },
  clear: (type: StorageType = 'session'): void => {
    if (typeof window === 'undefined') return;
    const storage =
      type === 'session' ? window.sessionStorage : window.localStorage;
    storage?.clear();
  },
  removeItem: (key: ItemKey, type: StorageType = 'session'): void => {
    if (typeof window === 'undefined') return;
    const storage =
      type === 'session' ? window.sessionStorage : window.localStorage;
    storage?.removeItem(key);
  },
  getItem: (key: ItemKey, type: StorageType = 'session'): unknown | null => {
    if (typeof window === 'undefined') return null;
    const storage =
      type === 'session' ? window.sessionStorage : window.localStorage;
    const storedItem = storage ? storage.getItem(key) : null;
    if (storedItem) {
      try {
        return JSON.parse(storedItem);
      } catch (error) {
        console.error(`Failed to parse item "${key}":`, error);
      }
    }
    return null;
  }
};

export default storageHelper;

// class cache {
//   setCache(key: string, value: any) {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }
//   getCache(key: string) {
//     const value = window.localStorage.getItem(key);
//     if (value) {
//       return JSON.parse(value);
//     }
//   }
//   deleteCache(key: string) {
//     window.localStorage.removeItem(key);
//   }
//   clearCache() {
//     window.localStorage.clear();
//   }
// }
// export default new cache();
