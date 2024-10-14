import { stdin, stdout } from 'process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

import  { modulesList } from './core/modules-list.js';
import { parseCommand, parseMessage } from './core/index.js';
// import { listDir, catFile } from './modules/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadModules = async () => {
    const loadedModules = {};

    for (const module of modulesList) {
        const modulePath = path.resolve(__dirname, `./modules/${module}.js`);

        if (fs.existsSync(modulePath)) {
            try {
                const moduleURL = new URL(`file://${modulePath}`);
                const mod = await import(moduleURL);
                loadedModules[module] = mod;
            } catch (error) {
                console.error(`Error loading ${module} module: ${error}`);
            }
        } else {
            console.error(`Module not found: ${module}`);
        }
    }

    return loadedModules;
};

const appModules = await loadModules();

// modulesList.forEach(async (module) => {
//     const modulePath = path.resolve(__dirname, `./modules/${module}.js`);

//     if (fs.existsSync(modulePath)) {
//         try {
//             const modURL = new URL(`file://${modulePath}`);
//             const mod = await import(modURL);
//         } catch (error) {
//             console.error(`Error loading ${module} module: ${error}`);
//         }
//     } else {
//         console.error(`Module not found: ${module}`);
//     };
// });

const args = process.argv.slice(2);
let currentDir = os.homedir();
let username = "Unknown User";
let lang = "en";
let messages = {};

args.forEach((arg) => {
    if (arg.startsWith("--username")) {
        username = arg.split("=")[1];
    }

    // if (arg.startsWith("--lang")) {
    //     const langArg = arg.split("=")[1];
    //     lang = ["en", "ru"].includes(langArg) ? langArg : "en";
    // }
});

messages = JSON.parse(fs.readFileSync(`./src/messages/${lang}.json`, 'utf8'));

stdout.write(parseMessage(messages.WELCOME, ['username', 'currentdir'], [username, currentDir]));

stdin.on('data', (command) => {
    const commandString = command.toString().trim();
    const parsedCommand = parseCommand(commandString);
    if (!parsedCommand) {
        stdout.write(parseMessage(messages.INVALID_COMMAND, ['command'], [commandString]) + "\n");
        return;
    };

    switch (parsedCommand.command) {
        case 'up':
            // currentDir = path.resolve(currentDir, '..');
            break;
        case 'cd':
            // currentDir = path.resolve(currentDir, parsedCommand.args[0]);
            break;
        case 'ls':
            appModules.ls.listDir(currentDir);
            break;
        default:
            stdout.write(parseMessage(messages.INVALID_COMMAND, ['command'], [commandString]) + "\n");
            break;
    }

    // stdout.write(`${parsedCommand.command} \n`);
    // stdout.write(`${ls.listDir(currentDir)} \n`);
});

// function parseMessage(message, fields, values) {
//     fields.forEach((field, index) => {
//         message = message.replace(`%${field}%`, values[index]);
//     });

//     return message;
// }

// function setLanguage() {

// }

// function parseCommand(command) {
//     command = command.toString().trim();
//     console.log('Command is: ', command);
//     const allowedCommands = [
//         "up",
//         "cd",
//         "ls",
//         "cat",
//         "add",
//         "rn",
//         "cp",
//         "mv",
//         "rm",
//         "hash",
//         "compress",
//         "decompress"
//     ];

//     const commandParts = command.split(' ');
//     command = commandParts[0];
//     args = commandParts.slice(1);

//     command = allowedCommands.includes(command) ? 
//             command + '...\n':
//             parseMessage(messages.INVALID_COMMAND, ['command'], command) + '...\n';

//     return {
//         command,
//         args,
//     };
// }
