const ganache = require('ganache-cli');

const ganache_config = {
  mnemonic: 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'
};

const ganache_node = ganache.server(ganache_config);

ganache_node.listen('8545', (err, bc) => {
  console.log('\n *******************************************\n Ganache ok...');
});

