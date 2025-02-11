# complex-dotenv-json

![Total NPM Downloads](https://img.shields.io/npm/dt/complex-dotenv-json.svg?label=total%20downloads)
![Monthly NPM Downloads](https://img.shields.io/npm/dm/complex-dotenv-json?label=monthly%20downloads)

> Load environment variables via a JSON file

```shell
npm install complex-dotenv-json
```

This is a drop-in replacement for the [dotenv-json](https://www.npmjs.com/package/dotenv-json) package, with support for complex JSON objects.

## Usage

Define your environment variables in `.env.json` in the root of your project (or wherever you start your node process):

```json
{
  "public_api_key": "s@Mpl3_d@Ta",
  "secret_api_key": "s@Mpl3_d@Ta_SECRET",
  "database": {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "postgres"
  }
}
```

Note that in the example above, the `database` section is a nested object. This is not able to be stored in a tree structure in environmental variables, so instead it is stored as a JSON string. It can easily be accessed by the following code:

```js
// Parses the JSON string into an object
const database = JSON.parse(process.env.database);

// Access the object properties
console.log(database.host); // "localhost"
console.log(database.port); // 5432
```

Load your environment variables at the beginning of your program:

```js
require("complex-dotenv-json")();

console.log(process.env.public_api_key) // => s@Mpl3_d@Ta
```

_N.B. Existing keys in `process.env` will **not** be overwritten._

You can customize the location of your `.env.json` file by passing a `path` option:

```js
const dotenvJSON = require("complex-dotenv-json");
dotenvJSON({ path: "./config/example.json" });
```
