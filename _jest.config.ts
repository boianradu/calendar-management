import { Config } from 'jest';

const config: Config = {
    extensionsToTreatAsEsm: ['.js'],
    preset: 'jest',
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    roots: ['<rootDir>/dist'],
    testEnvironment: 'node',
};

export default config;