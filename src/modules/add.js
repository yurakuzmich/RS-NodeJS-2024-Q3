import { promises as fs } from 'fs';
import { stdout } from 'process';
import path from 'path';

export const handleCommand = async (currentDir, file) => {
    try {
        const filePath = path.join(currentDir, file);
        // const stats = await fs.stat(filePath);

        await fs.writeFile(filePath, '', 'utf8');

        stdout.write(`File ${file} created successfully.\n`);
    } catch (error) {
        console.error(`Operation failed`);
    }
}