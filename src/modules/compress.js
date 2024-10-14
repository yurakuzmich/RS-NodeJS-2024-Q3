import fs from 'fs';
import { createBrotliCompress } from 'zlib';
import path from 'path';
import { stdout } from 'process';

export const handleCommand = (currentDir, sourcePath, destinationPath) => {
    if (!fs.existsSync(sourcePath)) {
        stdout.write(`Error: Source file '${sourcePath}' does not exist.\n`);
        return;
    }

    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    const brotliStream = createBrotliCompress();

    readStream
        .pipe(brotliStream)
        .pipe(writeStream)
        .on('finish', () => {
            stdout.write(`File '${sourcePath}' compressed to '${destinationPath}' successfully.\n`);
        })
        .on('error', (err) => {
            stdout.write(`Error during compression: ${err.message}\n`);
        });
};
