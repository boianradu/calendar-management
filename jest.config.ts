export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    testMatch: ['<rootDir>/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
    coverageDirectory: './coverage',
    coveragePathIgnorePatterns: ['node_modules', 'src/database', 'src/test', 'src/types'],
    reporters: ['default', 'jest-junit'],
    globals: { 'ts-jest': { diagnostics: false } },
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/'],
    extensionsToTreatAsEsm: ['.ts'],
};