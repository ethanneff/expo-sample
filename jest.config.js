module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$':
      '<rootDir>/jest.files.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/node_modules/jest-offline'],
  coverageDirectory: '<rootDir>/.cache/jest',
};
