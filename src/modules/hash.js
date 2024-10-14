import fs from 'fs';
import crypto from 'crypto';
import { stdout } from 'process';

export const handleCommand = (filePath) => {
    try {
        if (fs.lstatSync(filePath).isDirectory()) {
            stdout.write(`Error: '${filePath}' is a directory. Please provide a file path.\n`);
            return;
        }
    } catch (error) {
        stdout.write(`Error: Unable to check path '${filePath}'. ${error.message}\n`);
        return;
    }

    if (!fs.existsSync(filePath)) {
        stdout.write(`Error: File '${filePath}' does not exist.\n`);
        return;
    }

    const hash = crypto.createHash('sha256');

    const readStream = fs.createReadStream(filePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        const fileHash = hash.digest('hex');
        stdout.write(`Hash of ${filePath}: ${fileHash}\n`);
    });

    readStream.on('error', (err) => {
        stdout.write(`Error reading file: ${err.message}\n`);
    });
};
