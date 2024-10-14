import { createReadStream, createWriteStream, promises as fs } from 'fs';
import path from 'path';

export const handleCommand = async (currentDir, sourceFilePath, targetDir) => {
    try {
        const sourceFullPath = path.resolve(currentDir, sourceFilePath);
        const fileName = path.basename(sourceFullPath);
        const targetFullPath = path.resolve(currentDir, targetDir, fileName);

        await fs.access(sourceFullPath);

        const targetDirectory = path.resolve(currentDir, targetDir);
        await fs.mkdir(targetDirectory, { recursive: true });

        const readStream = createReadStream(sourceFullPath);
        const writeStream = createWriteStream(targetFullPath);

        readStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        await fs.unlink(sourceFullPath);
        console.log(`File moved from ${sourceFullPath} to ${targetFullPath}`);
        
    } catch (error) {
        console.error(`Operation failed`);
    }
};