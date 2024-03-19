

module.exports = {
    collectCoverageFrom:[
        'src/*.js',
    ],
    rootDir:'./',
    collectCoverage:true
    ,coverageDirectory: "<rootDir>/coverage/unit-tests",
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    testEnvironment: "jsdom",
  testMatch: ["**/*.test.js"],
    verbose:true,
    resetMocks:true,
    transformIgnorePatterns: [
      `/node_modules/(?!react-dnd|dist/index)`
    ],
      setupFilesAfterEnv:["<rootDir>/jest.setup.js"],
      moduleNameMapper:{
        "\\.(svg|css|scss)$":"<rootDir>/__mocks__/fileMock.js"
      }

  };
