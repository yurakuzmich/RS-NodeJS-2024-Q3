import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import  { modulesList } from './modules-list.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadModules = async () => {
    const loadedModules = {};

    for (const module of modulesList) {
        const modulePath = path.resolve(__dirname, `./../modules/${module}.js`);

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