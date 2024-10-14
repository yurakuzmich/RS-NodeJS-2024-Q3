
import { createReadStream, createWriteStream, promises as fs } from 'fs';
import path from 'path';

export const handleCommand = async (currentDir, sourceFilePath, targetDir) => {
    try {
        const sourceFullPath = path.resolve(currentDir, sourceFilePath);
        const fileName = path.basename(sourceFullPath);
        const targetFullPath = path.resolve(currentDir, targetDir, fileName);

        console.log(currentDir, sourceFilePath, fileName, targetFullPath);

        await fs.access(sourceFullPath);

        const targetDirectory = path.resolve(currentDir, targetDir);
        await fs.mkdir(targetDirectory, { recursive: true });

        const rStream = createReadStream(sourceFullPath);
        const wStream = createWriteStream(targetFullPath);

        rStream.pipe(wStream);

        rStream.on('error', (error) => {
            console.error(`Error reading file: ${error.message}`);;
        });

        wStream.on('error', (error) => {
            console.error(`Error writing file: ${error.message}`);
        });

        wStream.on('finish', () => {
            console.log(`File copied to ${targetFullPath}`);
        });

    } catch (error) {
        console.error(`Operation failed`);
    }
}