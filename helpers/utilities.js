/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Rahat Kabir
 * Date: 11/21/2020
 *
 */

// dependencies

// module scaffolding
const crypto = require("crypto");

const utilities = {};
const environments = require("./environment");

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    console.log(environments, process.env.NODE_ENV);
    return crypto
        .createHmac("sha256", environments.secretKey)
        .update(str)
        .digest("hex");
  }
  return false;
};
// create a string of random alphanumeric characters, of a given length
utilities.createRandomString = (strLength) => {
  let length = strLength;
  length = typeof length === "number" && length > 0 ? length : false;
  if (length) {
    // Define all the possible characters that could go into a string
    const possibleCharacters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // Start the final string
    let str = "";

    for (let i = 0; i < length; i++) {
      // Get a random character from the possibleCharacters string
      const randomCharacter = possibleCharacters.charAt(
          Math.floor(Math.random() * possibleCharacters.length)
      );

      // Append this character to the final string
      str += randomCharacter;
    }

    // Return the final string
    return str;
  }
};

// export module
module.exports = utilities;
