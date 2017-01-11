// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    enableProdMode();
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
