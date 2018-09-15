# A Distributed Public key Infrastructure...
## ... with Ethereum and IPFS

No general purpose... 
Just for learning and have fun... !
![alt text](http://www.infobascongo.net/beta/wp-content/2012/07/Chevre.jpg  "Logo Title Text 1")

### How to ?
#### Setup 
````
# Clone and cd to the repo
git clone https://github.com/guillaumecz/dpki-Ethereum.git
cd dpki-Ethereum

# Install npm dependencies
npm install -g truffle
npm install

# Start a daemon (ipfs & ganache)
npm run daemons

# Migrate contracts to network
truffle migrate
````
### Use
`./cli/dpki -h` --> Get help

#### There are two types of actions :
##### IPFS 
- `./cli/dpki ipfs-save <filePath> `: Add a specified file to the ipfs network, returns the newly created ipfs-address
- `./cli/dpki ipfs-cat <ipfs-addr>`: Get the value of file stored at <ipfs-address> on IPFS
##### Ethereum
- `./cli/dpki new <name> <fileOrIpfsId>`: Save into Ethereum the association between the given `<name>` and `<fileOrIpfsId>`. Has an option (-f) to specify if it has to store a file into IPFS before interacting with Ethereum.
-`./cli/dpki key <name>`: Get the IPFS address of the public key file of the user `<name`.

#### Tests
- `npm run test`: nodeJs tests
- `npm run all-tests`: nodeJs and Solidity tests

[site](https://guillaumecz.github.io/dpki-Ethereum/)
