const config = {
    extensionsToTreatAsEsm: ['.js'],
    preset: 'jest',
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    roots: ['<rootDir>/dist'],
    testEnvironment: 'node',
};

module.exports = config;