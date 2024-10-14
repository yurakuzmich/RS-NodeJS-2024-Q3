import { stdin, stdout } from 'process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { parseCommand, parseMessage, loadModules, exitApp } from './core/index.js';

const appModules = await loadModules();

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

console.log("USERNAME: ", username);
console.log("ARGS: ", args);

messages = JSON.parse(fs.readFileSync(`./src/messages/${lang}.json`, 'utf8'));

stdout.write(parseMessage(messages.WELCOME, ['username', 'currentdir'], [username, currentDir]));

stdin.on('data', async (command) => {
    const commandString = command.toString().trim();
    const parsedCommand = parseCommand(commandString);

    if(commandString === '.exit') {
        exitApp(parseMessage(messages.GOODBYE, ['username'], [username]));
    }

    if (!parsedCommand) {
        stdout.write(parseMessage(messages.INVALID_COMMAND, ['command'], [commandString]) + "\n");
        return;
    };

    try {
        switch (parsedCommand.command) {
            case 'up':
                currentDir = await appModules.up.handleCommand(currentDir);
                break;
            case 'cd':
                currentDir = await appModules.cd.handleCommand(currentDir, parsedCommand.args[0]);
                break;
            case 'ls':
                await appModules.ls.handleCommand(currentDir);
                break;
            case 'cat':
                await appModules.cat.handleCommand(path.join(currentDir, parsedCommand.args[0]));
                break;
            case 'add':
                await appModules.add.handleCommand(currentDir, parsedCommand.args[0]);
                break;
            case 'rn':
                await appModules.rn.handleCommand(currentDir, parsedCommand.args[0], parsedCommand.args[1]);
                break;
            case 'cp':
                await appModules.cp.handleCommand(currentDir, parsedCommand.args[0], parsedCommand.args[1]);
                break;
            case 'mv':
                await appModules.mv.handleCommand(currentDir, parsedCommand.args[0], parsedCommand.args[1]);
                break;
            case 'rm':
                await appModules.rm.handleCommand(currentDir, parsedCommand.args[0]);
                break;
            case 'hash':
                await appModules.hash.handleCommand(path.join(currentDir, parsedCommand.args[0]));
                break;
            case 'os':
                const param = parsedCommand.args[0];
                await appModules.os.handleCommand(param);
                break;
            case 'compress':
                await appModules.compress.handleCommand(
                    currentDir, 
                    path.join(currentDir, parsedCommand.args[0]), 
                    path.join(currentDir, parsedCommand.args[1])
                );
                break;
            case 'decompress':
                await appModules.decompress.handleCommand(
                    currentDir, 
                    path.join(currentDir, parsedCommand.args[0]), 
                    path.join(currentDir, parsedCommand.args[1])
                );
                break;
            default:
                stdout.write(parseMessage(messages.INVALID_COMMAND, ['command'], [commandString]) + "\n");
        }
    } catch (error) {
        console.error(`Error executing command: ${err.message}`);
    }

    stdout.write(`${username} ${currentDir}: `);
});

process.on('SIGINT', () => {
    exitApp(parseMessage(messages.GOODBYE, ['username'], [username]));
});
