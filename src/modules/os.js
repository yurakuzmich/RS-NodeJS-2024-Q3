import { stdout } from 'process';
import os from 'os';

export const handleCommand = (command) => {
    switch (command) {
        case '--EOL':
            const eol = JSON.stringify(os.EOL);
            stdout.write(`Default system EOL: ${eol}\n`);
            break;

        case '--cpus':
            const cpus = os.cpus();
            const cpuInfo = cpus.map((cpu, index) => {
                return `CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`;
            });
            stdout.write(`Total CPUs: ${cpus.length}\n`);
            stdout.write(cpuInfo.join('\n') + '\n');
            break;

        case '--homedir':
            const homeDir = os.homedir();
            stdout.write(`Home Directory: ${homeDir}\n`);
            break;

        case '--username':
            const userInfo = os.userInfo();
            stdout.write(`Current System User Name: ${userInfo.username}\n`);
            break;

        case '--architecture':
            const architecture = os.arch();
            stdout.write(`CPU Architecture: ${architecture}\n`);
            break;

        default:
            stdout.write('Invalid OS command\n');
            break;
    }
};
