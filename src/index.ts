import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';    // Your other application code follows
const app = express();
import * as fs from 'fs';
import path from 'path';
import { eventEmitter } from './Emitters/logEventEmitter.ts';

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error.message);
    process.exit(1); // Exit the process to avoid undefined state
});

console.log('hello world');
console.log(`PORT: ${process.env.PORT}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);

eventEmitter.emit('log','New tes log massage from server.ts');
eventEmitter.emit('error','Some errors ...');
