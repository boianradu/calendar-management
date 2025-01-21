import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts', '.js'],
    testEnvironment: 'node',
};
export default config;