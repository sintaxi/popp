# popp

> Command line tool to pluck the first line out of a file

Zero dependencies. Requires Node >= 18.

## Install

    npm install -g popp

## CLI Usage

Pop the first line off a file and print it to stdout:

    popp path/to/file.txt

Rotate — pop the first line and append it to the end:

    popp path/to/file.txt --rotate

Show help:

    popp --help

## Programmatic Usage

```js
const popp = require("popp")

// pop first line
const line = popp("path/to/file.txt")

// pop and rotate
const line = popp("path/to/file.txt", { rotate: true })
```

## Options

| Flag | Short | Description |
|------|-------|-------------|
| `--rotate` | `-r` | Move the popped line to the end of the file |
| `--help` | `-h` | Show help message |

## Test

    npm test
