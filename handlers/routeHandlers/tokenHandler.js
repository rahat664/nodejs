/*
 * Title: User Handler
 * Description: Handler to handle token related routes
 * Author: Rahat Kabir
 * Date: 26/02/2022
 *
 */
// dependencies
const data = require("../../lib/data");
const {hash} = require("../../helpers/utilities");
const {parseJSON} = require("../../helpers/utilities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
};

// @TODO: Authentication
handler._token.get = (requestProperties, callback) => {

};

// @TODO: Authentication
handler._token.put = (requestProperties, callback) => {

};

// @TODO: Authentication
handler._token.delete = (requestProperties, callback) => {

};

module.exports = handler;
