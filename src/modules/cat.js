import path from 'path';
import fs from 'fs';
import { stdout } from 'process';

export const handleCommand = (file) => {
    const filePath = path.resolve(file);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Operation failed');
            return;
        }

        const rStream = fs.createReadStream(filePath, 'utf8');

        rStream.on('error', (error) => {
            console.error('Error reading file:', error);
        });

        rStream.pipe(stdout);

        rStream.on('end', () => {
            stdout.write('\n');
        });
    });
}