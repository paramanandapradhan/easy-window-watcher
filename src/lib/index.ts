
declare const window: any;

class WindowWatcher {
    private key: string
    constructor(windowKey: string) {
        this.key = windowKey;

    }

    public watch<T>(): Promise<T> {
        return new Promise((resolve: any) => {
            this.check(resolve);
        })
    }

    check(resolve: any) {
        if (window && window[this.key]) {
            resolve(window[this.key])
        } else {
            setTimeout(() => {
                this.check(resolve);
            }, 10);
        }
    }
}

async function watchWindowValue<T>(key: string) {
    return await new WindowWatcher(key).watch<T>();
}

export default watchWindowValue;

