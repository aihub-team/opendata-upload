import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const username = process.env.AIHUB_USERNAME;
const password = process.env.AIHUB_PASSWORD;

export { username, password };
