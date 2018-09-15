const IPFS = require('ipfs');

const ipfs_node = new IPFS();

ipfs_node.on('ready', () => {
  console.log('\n *******************************************\n IPFS ok...');
});
