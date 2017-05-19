# Ping Lang

A very small language project to help me to learn more about Abstract Syntax Tree.

**This compiler is WIP**.

A example of this language specification can be found [here](./sample/sample.ping). 

## Supported keywords

List of commands supported and planning to implement:

- [x] `show`: Just prints a message in your `stdout`
- [x] `#`: Add a comment to your code
- [ ] `def`: Add a variable

## Usage

### Node

```javascript
var Ping = require('ping')
var code = 'show "just a message"';

console.log(JSON.stringify(Ping.compile(code)));
```

### Browser

```html
<script src="path/to/ping.js"></script>
```

```javascript
var code = 'show "just a message"';
var result = Ping.compile(code);

document.body.innerHTML = result;
```

## Build

Type `npm run build` in your tty and be happy. :D

## Sample

Type `npm run sample` in your tty and see `dist/result/result.js` file.