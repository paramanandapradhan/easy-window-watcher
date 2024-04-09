
declare const window: any;

class WindowWatcher {
    private key: string
    constructor(windowKey: string) {
        this.key = windowKey;
    }

    private checkKey(obj: any, path: string) {
        // Split the path into an array of keys
        const keys = path.split('.');
        // Start with the initial object
        let current = obj;

        // Traverse the object using the keys
        for (const key of keys) {
            if (current[key] === undefined) {
                // If the key does not exist, return false
                return false;
            }
            // Move to the next level in the object
            current = current[key];
        }

        // If all keys are found, return true
        return true;
    }

    private getValue(obj: any, path: string) {
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

    private check(resolve: any) {
        if (this.checkKey(window, this.key)) {
            resolve(this.getValue(window, this.key))
        } else {
            setTimeout(() => {
                this.check(resolve);
            }, 10);
        }
    }

    public watch<T>(): Promise<T> {
        return new Promise((resolve: any) => {
            this.check(resolve);
        })
    }
}

async function watchWindowValue<T>(key: string) {
    return await new WindowWatcher(key).watch<T>();
}

export default watchWindowValue;

