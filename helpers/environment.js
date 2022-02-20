/*
* Title : Environment
* Description : Environment related helper functions
* Author : Rahat Kabir
* Date: 17/02/2022
* */

// dependencies

// module scaffolding
const environments = {};

// staging environment
environments.staging = {
  port: 3000,
  envName: "staging",
  hashingSecret: "thisIsASecret",
};

// production environment
environments.production = {
    port: 5000,
    envName: 'production',
    hashingSecret: 'thisIsAlsoASecret',
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
