/*
 * Title: user Handler
 * Description: User Handler
 * Author: Rahat Kabir
 * Date: 20/02/2022
 *
 */
// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    const acceptedMethods = ['post', 'get', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {

}

handler._user.get = (requestProperties, callback) => {
    callback(200);
}

handler._user.put = (requestProperties, callback) => {

}

handler._user.delete = (requestProperties, callback) => {

}

module.exports = handler;
