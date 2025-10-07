import { format } from 'date-fns';
import { EventEmitter } from 'events';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';

class MyEmitter extends EventEmitter {};
const eventEmitter = new MyEmitter(); 
// this is cu
const currentWorkingDirectory = process.cwd();
// log event handler
const logEventHandler = async(message: string) => {
    // path to folder "logs" in the current working directory
    const logsFolderPath = path.join(currentWorkingDirectory, 'logs');
    try {
        if(!fs.existsSync(logsFolderPath)) {
            await fsPromises.mkdir(path.join(logsFolderPath), { recursive: true });
        }
        let eventTime = format(new Date(), 'HH:mm:ss dd-MM-yy');
        let eventId = uuid().slice(0,16);
        let logItem = `[${eventTime}]\t\t${eventId}\t${message}\n`;
        await fsPromises.appendFile(path.join(logsFolderPath, 'logsStorage.txt'), logItem);
    } 
    catch (error) {
        console.error(error);
    }
}
// error event handler
const errorEventHandler = async(message: string) => {
    const errorsFolderPath = path.join(currentWorkingDirectory, 'logs');
    try {
        if(!fs.existsSync(errorsFolderPath)) {
            await fsPromises.mkdir(path.join(errorsFolderPath), { recursive: true });
        }
        let logItem = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss\t')}\s${uuid()}\t${message}\n`;
        await fsPromises.appendFile(path.join(errorsFolderPath, 'errorsLog.txt'), logItem);
    } 
    catch (error) {
        console.error(error);
    }

    console.log(`Error event ==> ${message}`);
}
// error event handler
const customEventHandler = (message: string) => {
    console.log(`Custom event ==> ${message}`);
}

eventEmitter.on('log', (message) => logEventHandler(message));
eventEmitter.on('error', (message) => errorEventHandler(message));
eventEmitter.on('custom', (message) => customEventHandler(message));

export { eventEmitter };