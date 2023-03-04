# :house: Homework 2

0. Cover home tasks from lecture 1 with TS (if it hasn't been covered)
1. Write a function that accepts any kind of array and an asynchronous callback, that is invoked on each array element sequentially. The result of invocation must be an array of callback results. All types must apply automatically (Template function).
   Invocation example:

```ts
const array: Array<string> = ["one", "two", "three"];

const results = await runSequentially(array, (item, index) =>
  Promise.resolve({
    item,
    index,
  })
);
```

IDE must consider variables from example as next:

item type = string

index type = number

results type = Array<{item: string, index: number}>

2. Write a function that accepts any kind of array and a predicate for array elements removing. Passed array must be mutated. All removed elements must be returned as array
   types must apply automatically (Template function).

Invocation example:

```ts
const array = [1, 2, 3, 6, 7, 9];

const removedElements = arrayMutateRemove(array, (item) => item % 2 === 0);
```

IDE must consider variables from example as next:

item: number

removedElements: Array<number>

result of invocation:

array = [1, 3, 7, 9]

removedElements = [2, 6]

3. Write a node.JS program with TypeScript that gets from the command line string parameter - path to JSON file, reads and parses its content. 
Then, program should create a folder “<JSON_filename>_pages”. For each link in the file get the HTML content of it and save it to the file in the created folder.
JSON file contains an array of strings - links. Example of the file you can find [here](/lecture_03/links.json).

4. Write a node.JS program with TypeScript that gets from the command line numeric parameter - frequency in seconds.
Program should print every tick (defined by frequency) next system information:
    ```
    - operating system
    - architecture
    - current user name
    - cpu cores models
    - cpu temperature
    - graphic controllers vendors and models
    - total memory, used memory, free memory in GBs
    - if system has, battery info (charging, percent, remaining time)
    ```
5. Write your own implementation of `EventEmitter` class (_Publisher/Subscriber_).
It should behave like the following:
   ```js
   const emitter = new MyEventEmitter();

   emitter.registerHandler('usedUpdated', () => console.log('User was updated'));
   
   emitter.emitEvent('usedUpdated'); // User was updated
   ```

### Useful links:

[TypeScript docs](https://www.typescriptlang.org/docs/)

[TS generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

[TS functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

[TS narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

[TSConfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

[TS complier options](https://www.typescriptlang.org/tsconfig)

[tsc CLI options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

[NVM guide](https://ua-blog.com/%D1%82%D1%83%D1%82%D0%BE%D1%80%D0%B8%D0%B0%D0%BB-%D0%BF%D0%BE-node-version-manager-nvm)

[Node.js tutorial](https://nodejs.dev/learn)

[Node.js basics course](https://www.codecademy.com/learn/learn-node-js)

[Blocking vs Non-Blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/)

[Node.js URL docs](https://nodejs.org/docs/latest-v14.x/api/url.html)

[Node.js fs docs](https://nodejs.org/docs/latest-v14.x/api/fs.html)

[Node.js streams docs](https://nodejs.org/docs/latest-v14.x/api/stream.html)

[Node.js events docs](https://nodejs.org/docs/latest-v14.x/api/events.html)

[Service for HTTP requests testing](https://httpstat.us/)