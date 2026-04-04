const path = require('path');
try {
  require(path.join(__dirname, 'node_modules', 'dotenv')).config({ path: path.join(__dirname, '.env.deploy') });
} catch (e) {}

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/main',
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      'pre-deploy-local': `scp .env ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}/current/.env`,
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
