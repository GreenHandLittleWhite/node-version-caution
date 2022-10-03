
import * as fs from 'fs';
import * as os from 'os';

export function isWinOS() {
    return os.platform() === 'win32';
}

export function isMacOS() {
    return os.platform() === 'darwin';
}

export function getPathHack(filePath: string) {
    if (isWinOS()) {
        return filePath.slice(1);
    }
    return filePath;
}

export function canReadFile(filePath: string) {
    return new Promise((resolve, reject) => {
        const realPath = getPathHack(filePath);
        fs.access(realPath, fs.constants.F_OK, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}

export async function hasFile(projectPath: string) {
    try {
        return await canReadFile(projectPath);
    } catch (err) {
        return false;
    }
}


export function readFile(filePath: string) {
    const realPath = getPathHack(filePath);
    return JSON.parse(fs.readFileSync(realPath, 'utf-8'));
}
