# Slot Change Polyfill
This is a polyfill for the "slotchange" event fired on an slot element when the node(s) contained in that slot change.

Read more about the "slotchange" event [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event).


# How to Install

```bash
npm install web-component-slotchange-polyfill
```


# Usage


This polyfill should be added last as it is dependent on other polyfills like custom-elements to be loaded.

### Include as a package

*Note! The bellow file can be found here: node_modules/web-component-slotchange-polyfill/lib/slotchange-polyfill.min.js.*

```html
<script src="slotchange-polyfill.min.js"></script>
```

### Include as a module

```javascript
require('web-component-slotchange-polyfill');
```


# Configuration

### Example

```html
<script>
    window.slotChangePolyfill = {
        // Forces the polyfill to be loaded
        force: false
    };
</script>
<script src="slotchange-polyfill.min.js"></script>
```

### Options

| Name  | Type    | Default | Description                                                  |
| ----- | ------- | ------- | ------------------------------------------------------------ |
| force | boolean | false   | Forces the polyfill to be loaded even if the browser has native support. |




# Known Limitations
If multiple slots are used, all event listeners will be fired even if only one slot is changed.

# How to Develop

### Installation

```bash
npm install
```

### Compilation

```bash
npm run compile
```

### Run watcher

```bash
npm run watch
```

