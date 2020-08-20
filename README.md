<h1 align="center">tabcast</h1>

<p align="center">
TypeScript message passing (broadcasting) across multiple tabs of same origin.
</p>

<p align="center">
<img alt="workflow" src="https://img.shields.io/github/workflow/status/mat-sz/tabcast/Node.js%20CI%20(yarn)">
<a href="https://npmjs.com/package/tabcast">
<img alt="npm" src="https://img.shields.io/npm/v/tabcast">
<img alt="npm" src="https://img.shields.io/npm/dw/tabcast">
<img alt="NPM" src="https://img.shields.io/npm/l/tabcast">
</a>
</p>

## Installation

Tabcast is available on [npm](https://www.npmjs.com/package/tabcast), you can install it with either npm or yarn:

```sh
npm install tabcast
# or:
yarn install tabcast
```

## Example usage

```ts
import Tabcast from 'tabcast';

const cast = new Tabcast(); // or new Tabcast('channel');

cast.on('message', (message: any) => {
  console.log(message);
});

cast.broadcast('Hello, world!');
```
