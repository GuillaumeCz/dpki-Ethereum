const ipfsAPI = require('ipfs-api');
const fs = require('fs');

// connection parameters
var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });

var exports = module.exports = {};

// Display the value of a file
// takes an id and returns the plain key
exports.cat = function(_fileIpfsId) {
    return new Promise((resolve, reject) => {
        ipfs.files.cat(_fileIpfsId).then(res => {
            // Next line should be removed...
            // Don't know why the resolve don't print it to the console
            console.log(res.toString())
            resolve(res.toString());
        }).catch(err => {
            reject(err);
        });
    });
};

// Save a key file in ipfs
// returns the file's id on ipfs
// accessible at localhost:8080/ipfs/<id>
exports.saveFile = function(_filePath) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(_filePath);
        const playload = { path: '/cli/assets/id_rsa.pub', content: data };
        ipfs.files.add(playload).then(r => {
            resolve(r[0].hash);
        });
    })
};

