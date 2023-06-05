const path = require("path");
const fs = require("fs");

module.exports = function dotenvJSON(options) {
  let envConfig;

  // populate envConfig either via .js or .json file
  try {
    const jsonFile = (options && options.path) || ".env.json";
    const jsFile = (options && options.jsPath) || ".env.js";
    if (require.resolve(jsFile)) {
        envConfig = require(jsFile);
    } else {
      const jsonString = fs.readFileSync(path.resolve(process.cwd(), jsonFile), {
        encoding: "utf8"
      });
      envConfig = JSON.parse(jsonString);
    }
  } catch (err) {
    console.error(err);
  }

  // apply envConfig to environment
  try {
    for (const key in envConfig) {
      if (process.env.hasOwnProperty(key)) {
        process.env[key] = process.env[key];
      } else {
        const value = envConfig[key];
        if (value === Object(value)) {
          process.env[key] = JSON.stringify(value);
        } else {
          process.env[key] = value;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};
