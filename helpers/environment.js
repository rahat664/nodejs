/*
* Title : Environment
* Description : Environment related helper functions
* Author : Rahat Kabir
* Date: 17/02/2022
* */

//dependencies

//module scaffolding

const environment = {}


environment.staging = {
    port: 3000,
    envName: 'staging'
}

environment.production = {
    port: 5000,
    envName: 'production'
}

//determine which environment was passed as a command line argument

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging';

//export corresponding environment

const environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.staging;

//export module
module.exports = environmentToExport;
