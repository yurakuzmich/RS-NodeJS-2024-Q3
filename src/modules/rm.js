import { promises as fs } from 'fs';
import path from 'path';

export const handleCommand = async (currentDir, filePath) => {
    try {
        const fullPath = path.resolve(currentDir, filePath);
        await fs.access(fullPath);

        await fs.unlink(fullPath);
        console.log(`File deleted: ${fullPath}`);
        
    } catch (error) {
        console.error(`Operation failed`);
    }
};