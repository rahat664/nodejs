/*
* Title : Crud operation using node js
* Description : This is a simple node js crud operation
* Author : Rahat Kabir
* Date: 18/02/2022
* */

// dependencies
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to stirng
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback('There was an error, file may already exists!');
        }
    });
};

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    })
}

//update existing file
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
          // convert Data to string
          const stringData = JSON.stringify(data);

          fs.ftruncate(fileDescriptor, (err) => {
            if (!err) {
              // write to file and close it
              fs.writeFile(fileDescriptor, stringData, (err) => {
                if (!err) {
                  fs.close(fileDescriptor, (err) => {
                    if (!err) {
                      callback(false);
                    } else {
                      callback("Error in closing file");
                    }
                  });
                } else {
                  callback("Error writing to existing file!");
                }
              });
            } else {
              callback("Error truncating file");
            }
          });
        } else {
          callback("Error opening file for updating!");
        }
    })
}

//delete existing File
lib.delete = (dir, file, callback) => {
    // unlink the file
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file!');
        }
    });
}
module.exports = lib;
