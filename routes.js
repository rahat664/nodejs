/*
 * Title: Routes
 * Description: Application Routes
 * Author: Rahat Kabir
 * Date: 16/02/2022
 *
 */

// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;
