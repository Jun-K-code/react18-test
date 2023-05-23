const { merge } = require('webpack-merge');
const config = require('./config/config');
const dev = require('./config/dev');
const pro = require('./config/pro');

module.exports = function ({ development }) {
    return merge(config, development ? dev : pro);
};
