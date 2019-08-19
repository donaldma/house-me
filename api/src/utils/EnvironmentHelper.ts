const getEnvironmentString = (): string => {
  if (!process.env.NODE_ENV) {
    return 'DEVELOPMENT'
  }
  return process.env.NODE_ENV.toUpperCase().trim()
}

const isTest = () => getEnvironmentString() === 'TEST'

const isTestLocal = () => getEnvironmentString() === 'TEST_LOCAL'

export default {
  getEnvironment: getEnvironmentString,

  isProduction: () => getEnvironmentString() === 'PRODUCTION',

  isStaging: () => getEnvironmentString() === 'STAGING',

  isDevelopment: () => getEnvironmentString() === 'DEVELOPMENT',

  isTest,

  isTestLocal,

  isTestInstance: () => isTest() || isTestLocal()
}
