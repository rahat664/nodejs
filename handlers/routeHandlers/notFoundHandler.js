/*
 * Title: Not Found Handler
 * Description: 404 Not Found Handler
 * Author: Rahat Kabir
 * Date: 16/02/2022
 *
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your requested URL was not found!',
    });
};

module.exports = handler;
