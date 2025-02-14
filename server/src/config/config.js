import dotenv from 'dotenv';
dotenv.config();
import ApiError from '../utils/ApiError.js';

if(!process.env.PORT){
  throw new Error('Port is not set');
}

if(!process.env.DB_URI){
  throw new Error('DB_URI is not set');
}

if(!process.env.JWT_SEC){
  throw new Error('JWT_SEC is not set');
}

if(!process.env.PRODUCTION){
  throw new Error('PRODUCTION key is not set');
}

const config = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SEC: process.env.JWT_SEC,
  PRODUCTION: process.env.PRODUCTION
};

export default config;