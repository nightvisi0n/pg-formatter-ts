module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/test/**/*.test.ts"], // Add this line
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
};
