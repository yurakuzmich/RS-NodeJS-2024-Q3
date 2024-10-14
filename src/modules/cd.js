import path from 'path';

export const handleCommand = async (currentDir, newDir) => {
    return path.resolve(currentDir, newDir);
}