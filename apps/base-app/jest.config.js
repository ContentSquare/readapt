module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/**/*.spec.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '\\.vue$': '@vue/vue2-jest'
  }
}
