module.exports = {
  apps: [{
    name: 'tache-famille-api',
    script: 'dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      JWT_SECRET: 'CHANGER_CE_SECRET_EN_PRODUCTION',
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
  }],
};
