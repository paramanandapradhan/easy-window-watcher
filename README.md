# easy-window-watcher
An easy method to verify if a JavaScript library has been loaded and is accessible in the window object.

# Install

```sh
npm i @cloudparker/easy-window-watcher --save-dev
```
# Usage

```js
import { watchWindowValue } from '@cloudparker/easy-window-watcher';

// ...

watchWindowValue('Cropper')
    .then((Cropper: any)=>{
        // This will be resolve when CropperJs script loaded and the reference is available window
        // Do use of window.Cropper now.
    });

//...

watchWindowValue('gapi').then((client) => {
    console.log('gapi', client);
});

watchWindowValue('google.accounts').then((acc) => {
    console.log('google.accounts', acc);
});
```
