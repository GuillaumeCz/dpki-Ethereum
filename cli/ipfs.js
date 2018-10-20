const ipfsAPI = require('ipfs-api');
const fs = require('fs');

// connection parameters
const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });

// Display the value of a file
// takes an id and returns the plain key
const cat = _fileIpfsId => new Promise((resolve, reject) => 
  ipfs.files.cat(_fileIpfsId)
    .then(res => resolve(res.toString()))
    .catch(err => reject(err)));

// Save a key file in ipfs
// returns the file's id on ipfs
// accessible at localhost:8080/ipfs/<id>
const saveFile = _filePath => new Promise((resolve, reject) => {
  fs.readFile(_filePath, (err, data) => {
    if(err) {
      reject(err);
    } 
    const playload = { path: _filePath, content: data };
    ipfs.files.add(playload)
      .then(r => resolve(r[0].hash))
      .catch(err => reject(_filePath +' -- '+ err));
  });
});

module.exports = { saveFile, cat };
