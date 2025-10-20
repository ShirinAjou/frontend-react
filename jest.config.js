export default {
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testEnvironment: 'jsdom',
};
