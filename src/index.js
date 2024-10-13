import { stdin, stdout } from 'process';
import fs from 'fs';
import os from 'os';

import { listDir } from './modules/index.js';

const args = process.argv.slice(2);
let currentDir = os.homedir();
let username = "Unknown User";
let lang = "en";
let messages = {};

listDir(currentDir);


args.forEach((arg) => {
    if (arg.startsWith("--username")) {
        username = arg.split("=")[1];
    }

    if (arg.startsWith("--lang")) {
        const langArg = arg.split("=")[1];
        lang = ["en", "ru"].includes(langArg) ? langArg : "en";
    }
});

messages = JSON.parse(fs.readFileSync(`./src/messages/${lang}.json`, 'utf8'));

stdout.write(parseMessage(messages.WELCOME, ['username', 'currentdir'], [username, currentDir]));

stdin.on('data', (data) => {

    stdout.write(data);
});

function parseMessage(message, fields, values) {
    fields.forEach((field, index) => {
        message = message.replace(`%${field}%`, values[index]);
    });

    return message;
}

async function setLanguage() {

}

async function parseCommand(command) {
    const allowedCommands = ["language", "help", "exit"];
}
