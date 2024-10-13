import { promises as fs } from 'fs';
import { stdout } from 'process';

export const listDir = async (dir) => {
    try {
        const dirContains = await fs.readdir(dir);
        const files = [];
        const dirs = [];

        for (const item of dirContains) {
            const path = `${dir}/${item}`;
            const stats = await fs.stat(path);

            if (stats.isDirectory()) {
                dirs.push({ item, type: 'dir' });
            } else {
                files.push({ item, type: 'file' });
            }
        }

        const result = [...dirs, ...files];
        const renderedResult = result.map((item, index) => {
            return renderLine(item.item, index, item.type);
        })

        stdout.write(`\n${renderedResult.join('\n')}\n`);
    } catch (err) {
        console.error(err);
    } 
}

function renderLine(item, index, type) {
    item = item.length > 30 ? (item.slice(0, 30) + '...').padEnd(40) : item.padEnd(40);
    index = String(index + 1).padEnd(3);
    type = type.padEnd(5);

    return `| ${index}| ${item}  | ${type} |`;
}