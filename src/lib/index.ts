
declare const window: any;

class WindowWatcher {
    private key: string
    private interval: number = 100;
    private maxWait: number = 5 * 60 * 1000; // 5 min wait time
    private waitCount: number = 0;

    constructor(windowKey: string) {
        this.key = windowKey;
    }



    private check(resolve: any) {
        if (getValue(window, this.key)) {
            resolve(getValue(window, this.key))
        } else {
            this.waitCount += this.interval;

            // Max wait time is 5 minutes;
            if (this.waitCount < this.maxWait) {
                setTimeout(() => {
                    this.check(resolve);
                }, this.interval);
            } else {
                resolve(undefined)
            }

        }
    }

    public watch<T>(): Promise<T> {
        return new Promise((resolve: any) => {
            this.check(resolve);
        })
    }
}

export function getValue(obj: any, path: string) {
    // Split the path into an array of keys
    const keys = path.split('.');
    // Start with the initial object
    let current = obj;

    // Traverse the object using the keys
    for (const key of keys) {
        if (current[key] === undefined) {
            // If the key does not exist, return false
            return undefined;
        }
        // Move to the next level in the object
        current = current[key];
    }

    // If all keys are found, return true
    return current;
}

export async function watchWindowValue<T>(key: string) {
    return await new WindowWatcher(key).watch<T | undefined>();
}


