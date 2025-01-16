import 'dotenv/config';
import { get } from 'env-var';

// ENV variables to connect to the DB
export const envs = {
    // DB 
    DB_PORT: get('DB_PORT').required().asPortNumber(),
    DB_HOST: get('DB_HOST').default('localhost').asString(),
    DB_USER: get('DB_USER').default('postgres').asString(),
    DB_PASS: get('DB_PASS').default('postgres').asString(),
    DB_NAME: get('DB_DATABASE').asString(),
    DB_URL: get('DATABASE_URL').asString(),
    API_PREFIX: ""

};