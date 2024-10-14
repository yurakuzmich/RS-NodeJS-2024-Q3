import { stdout } from 'process';

export const exitApp = (message) => {
    stdout.write(message);
    process.exit();
};