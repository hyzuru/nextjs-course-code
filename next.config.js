const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'mainuser',
        mongodb_password: '05xtMAKMOOpakuTj',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'meetups-dev',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'mainuser',
      mongodb_password: '05xtMAKMOOpakuTj',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'meetups',
    },
  };
};
