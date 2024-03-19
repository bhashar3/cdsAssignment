// module.exports = {
//     collectCoverageFrom:[
//         'src/*.js',
//     ],
//     transform: {
//       '^.+\\.js$': 'babel-jest',
//     },
//     rootDir:'./',
//     collectCoverage:true
//     ,coverageDirectory: "<rootDir>/coverage/unit-tests",
//     testPathIgnorePatterns: ["<rootDir>/node_modules/"],
//     testEnvironment: "jsdom",
//   testMatch: ["**/*.test.js"],
//     verbose:true,
//     resetMocks:true,
//     // transformIgnorePatterns: [
//     //   '/node_modules/(?!@ciscosystemscds/cds-react-table/)'
//     // ],
//       setupFilesAfterEnv:["<rootDir>/jest.setup.js"],
//       moduleNameMapper:{
//         "\\.(svg|css|scss)$":"<rootDir>/__mocks__/fileMock.js"
//       }
//   };

const config = {
  testEnvironment: "jsdom",
  verbose: true,
  rootDir: "./",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/**/*test*/*.{spec,test}.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "/node_modules/"
    //`/node_modules/(?!react-dnd|@ciscodesignsystems/cds-react-table)`
  ],
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageDirectory: "<rootDir>/coverage/unit",
  coverageReporters: ["html", "json", "lcov", "text"]
};

module.exports = config;
