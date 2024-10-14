import path from 'path';

export const handleCommand = async (currentDir) => {
    return path.resolve(currentDir, '..');
}