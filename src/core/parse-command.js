
import { promises as fs } from 'fs';
import { modulesList as allowedCommands } from './modules-list.js';
const messages = await loadMessages();

export const parseCommand = (command) => {
    const commandParts = command.split(' ');
    const commandBody = commandParts[0];
    const args = commandParts.slice(1);
    const parsedArgs = [];

    args.map((arg) => {
        if (arg.startsWith('--')) {
            const [ key, value ] = arg.slice(2).split('=');
            parsedArgs.push({ key, value });
        }
    });

    if (allowedCommands.includes(commandBody)) {
        return { command: commandBody, args };
    }

    return false;
}

async function loadMessages() {
    const messages = JSON.parse(await fs.readFile('./src/messages/en.json', 'utf8'));
    return messages;
}
