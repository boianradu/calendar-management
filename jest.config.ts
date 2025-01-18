import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    extensionsToTreatAsEsm: ['.ts'],
    testEnvironment: 'node', // or 'jsdom' for browser-like environment
};
export default config;