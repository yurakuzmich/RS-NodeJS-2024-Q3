import { promises as fs } from 'fs';
import { stdout } from 'process';
import path from 'path';

export const handleCommand = async (currentDir, oldFileName, newFileName) => {
    try {
        const fullOldName = path.join(currentDir, oldFileName);
        const oldFileDir = path.dirname(fullOldName);
        const newFileNameToRename = path.join(oldFileDir, newFileName);

        await fs.rename(fullOldName, newFileNameToRename);

        stdout.write(`File ${oldFileName} renamed to ${newFileName} successfully.\n`);
    } catch (error) {
        console.error(`Operation failed`);
    }
}