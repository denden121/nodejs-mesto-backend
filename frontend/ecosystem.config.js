const path = require('path');
try {
  require(path.join(__dirname, '..', 'backend', 'node_modules', 'dotenv')).config({ path: path.join(__dirname, '.env.deploy') });
} catch (e) {}

module.exports = {
  apps: [
    {
      name: 'mesto-frontend',
      script: 'serve',
      args: '-s build -l 3001',
      cwd: '/home/danila/mesto-frontend/current/frontend',
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
      'post-deploy': 'cd frontend && npm install && NODE_OPTIONS=--openssl-legacy-provider REACT_APP_API_URL=$REACT_APP_API_URL npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
