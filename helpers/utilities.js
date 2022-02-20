/*
 * Title : Utilities
 * Description :
 * Author : Rahat Kabir
 * Date: 17/02/2022
 * */

// dependencies
const crypto = require("crypto");
const environments = require("../helpers/environment");
// module scaffolding
const utilities = {};

// parse JSON string to an object in all caps
utilities.parseJsonStringToObject = (str) => {
  let outputObject = {};
  try {
    outputObject = JSON.parse(str);
  } catch (e) {
    console.log(e);
    outputObject = {};
  }
  return outputObject;
};

utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    return crypto
      .createHmac("sha256", environments.hashingSecret)
      .update(str)
      .digest("hex");
  } else {
    return false;
  }
};

// export module
module.exports = utilities;
