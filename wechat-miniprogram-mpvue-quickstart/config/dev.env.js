// SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
