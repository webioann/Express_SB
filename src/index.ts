import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';    // Your other application code follows
const app = express();

console.log('hello world', process.env.PORT);