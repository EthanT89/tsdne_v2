// tsdne_v2/frontend/jest.config.js

module.exports = {
  // Make sure to point to the newly installed environment
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
