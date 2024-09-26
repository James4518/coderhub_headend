export const checkDataMiddleware = (configs) => {
  const isArray = Array.isArray(configs);
  return (store) => (next) => (action) => {
    const processConfig = (config) => {
      const { type, stateKey } = config;
      if (action.type === type) {
        const currentState = store.getState()[stateKey];
        if (currentState) {
          return true;
        }
      }
      return false;
    };
    if (isArray) {
      for (const config of configs) {
        if (processConfig(config)) {
          return;
        }
      }
    } else {
      processConfig(configs);
    }
    return next(action);
  };
};
