
import dotenv from 'dotenv';
dotenv.config();

import envVar from 'env-var';
// ENV variables to connect to the DB
export const ENVS = {
    // DB 
    DB_PORT: envVar.get('DB_PORT').required().asPortNumber(),
    DB_HOST: envVar.get('DB_HOST').default('localhost').asString(),
    DB_USER: envVar.get('DB_USER').default('postgres').asString(),
    DB_PASS: envVar.get('DB_PASS').default('postgres').asString(),
    DB_NAME: envVar.get('DB_DATABASE').asString(),
    DB_URL: envVar.get('DATABASE_URL').asString(),
    PORT: 8080,
    API_PREFIX: ""

};