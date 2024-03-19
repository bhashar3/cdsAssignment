

module.exports = {
    collectCoverageFrom:[
        'src/*.js',
    ],
    rootDir:'./',
    collectCoverage:true
    ,coverageDirectory: "./coverage/unit-tests",
    testEnvironment: "jsdom",
  testMatch: ["**/*.test.js"],
    verbose:true,
    resetMocks:true,
    transformIgnorePatterns: [
        "<rootDir>/node_modules/"
      ],
      setupFilesAfterEnv:["<rootDir>/jest.setup.js"],
      moduleNameMapper:{
        "\\.(svg|css|scss)$":"<rootDir>/__mocks__/fileMock.js"
      }

  };