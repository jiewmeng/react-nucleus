const defaultConfig = require('./default')
const _ = require('lodash')

module.exports = function () {
  const NODE_ENV = process.env.NODE_ENV
  let envConfig
  let localConfig

  if (NODE_ENV) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      envConfig = require(`./${NODE_ENV}`)
    } catch (e) {
      // noop
    }
  }

  try {
    // eslint-disable-next-line global-require, import/no-unresolved
    localConfig = require('./local')
  } catch (e) {
    // noop
  }

  const config = _.merge({}, defaultConfig, envConfig, localConfig)
  Object.keys(config).forEach((k) => {
    config[k] = JSON.stringify(config[k])
  })
  return config
}
