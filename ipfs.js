const ipfsAPI = require('ipfs-api');
const fs = require('fs');

var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });

var exports = module.exports = {};

exports.cat = function(_fileIpfsId) {
    return new Promise((resolve, reject) => {
        ipfs.files.cat(_fileIpfsId).then(res => {
            resolve(res.toString());
        }).catch(err => {
            reject(err);
        });
    })
    
};

exports.saveFile = function(_filePath) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync('cli/assets/id_rsa.pub');
        const playload = { path: '/cli/assets/id_rsa.pub', content: data };

        ipfs.files.add(playload).then(r => {
            resolve(r[0].hash);
        });
    })
};

